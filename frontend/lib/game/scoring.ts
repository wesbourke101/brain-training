import type { GameSession, QuestionResponse, ParagraphTiming } from '@/types/session'
import type { SessionMetrics } from '@/types/metrics'
import type { QuestionType } from '@/types/question'

/**
 * Derive all session metrics from raw session data.
 * Called client-side when the session ends, before showing the results screen.
 */
export function calculateSessionMetrics(session: GameSession): SessionMetrics {
  const allResponses = session.stories.flatMap(s => s.questionsAnswered)
  const allTimings = session.stories.flatMap(s => s.paragraphTimings)
  const allWordCounts = session.stories.flatMap(s =>
    s.paragraphTimings.map((_, i) => {
      // We don't store wordCount per timing, so we approximate from session context.
      // Full word counts come from the Story objects — passed separately in real usage.
      return 0
    })
  )

  const totalQuestions = allResponses.length
  const totalCorrect = allResponses.filter(r => r.isCorrect).length
  const overallAccuracy = totalQuestions > 0 ? totalCorrect / totalQuestions : 0

  return {
    overallAccuracy,
    accuracyByDelay: calculateAccuracyByDelay(allResponses),
    accuracyByType: calculateAccuracyByType(allResponses),
    avgWpm: 0, // Requires word counts from Story objects — see calculateWpm()
    avgResponseTimeMs: calculateAvgResponseTime(allResponses),
    storiesCompleted: session.stories.filter(s => s.completedAt !== null).length,
    totalQuestions,
    totalCorrect,
  }
}

/**
 * Calculate session metrics with story word counts available.
 * Preferred version — pass stories alongside the session for accurate WPM.
 */
export function calculateSessionMetricsWithWpm(
  session: GameSession,
  storyWordCounts: Record<string, number>
): SessionMetrics {
  const base = calculateSessionMetrics(session)
  const allTimings = session.stories.flatMap(s => s.paragraphTimings)
  const totalWords = session.stories.reduce((sum, s) => {
    return sum + (storyWordCounts[s.storyId] ?? 0)
  }, 0)

  return {
    ...base,
    avgWpm: calculateWpm(allTimings, totalWords),
  }
}

/**
 * Calculate words per minute from paragraph timings and total word count.
 * Excludes timings where timeSpentMs === 0 (question interruptions don't count).
 */
export function calculateWpm(
  timings: ParagraphTiming[],
  totalWordCount: number
): number {
  const totalMs = timings.reduce((sum, t) => sum + t.timeSpentMs, 0)
  if (totalMs === 0 || totalWordCount === 0) return 0
  return Math.round((totalWordCount / totalMs) * 60_000)
}

/**
 * Accuracy grouped by delay (how many stories back the question reached).
 * Higher delay = more interference from subsequent stories = expected lower accuracy.
 *
 * Returns e.g. { 1: 0.80, 2: 0.55 }
 */
export function calculateAccuracyByDelay(
  responses: QuestionResponse[]
): Record<number, number> {
  const groups: Record<number, { correct: number; total: number }> = {}

  for (const r of responses) {
    if (!groups[r.delay]) groups[r.delay] = { correct: 0, total: 0 }
    groups[r.delay].total++
    if (r.isCorrect) groups[r.delay].correct++
  }

  return Object.fromEntries(
    Object.entries(groups).map(([delay, { correct, total }]) => [
      Number(delay),
      total > 0 ? correct / total : 0,
    ])
  )
}

/**
 * Accuracy grouped by question type (type-in, multi-choice, multi-select).
 * Returns e.g. { 'type-in': 0.60, 'multi-choice': 0.85, 'multi-select': 0.50 }
 */
export function calculateAccuracyByType(
  responses: QuestionResponse[]
): Record<QuestionType, number> {
  const groups: Record<string, { correct: number; total: number }> = {}

  for (const r of responses) {
    if (!groups[r.questionType]) groups[r.questionType] = { correct: 0, total: 0 }
    groups[r.questionType].total++
    if (r.isCorrect) groups[r.questionType].correct++
  }

  return Object.fromEntries(
    Object.entries(groups).map(([type, { correct, total }]) => [
      type,
      total > 0 ? correct / total : 0,
    ])
  ) as Record<QuestionType, number>
}

/** Average response time in ms across all question responses. */
export function calculateAvgResponseTime(responses: QuestionResponse[]): number {
  if (responses.length === 0) return 0
  const total = responses.reduce((sum, r) => sum + r.responseTimeMs, 0)
  return Math.round(total / responses.length)
}

/**
 * Grade a type-in answer.
 * Case-insensitive, trims whitespace, accepts partial match (answer contains correct).
 */
export function gradeTypeIn(userAnswer: string, correctAnswer: string): boolean {
  const clean = (s: string) => s.trim().toLowerCase()
  const user = clean(userAnswer)
  const correct = clean(correctAnswer)
  return user === correct || user.includes(correct) || correct.includes(user)
}

/**
 * Grade a multi-select answer.
 * All correct choices must be selected; no incorrect choices selected.
 */
export function gradeMultiSelect(
  selectedIds: string[],
  choices: Array<{ id: string; isCorrect: boolean }>
): boolean {
  const correctIds = new Set(choices.filter(c => c.isCorrect).map(c => c.id))
  const selectedSet = new Set(selectedIds)
  if (selectedSet.size !== correctIds.size) return false
  for (const id of correctIds) {
    if (!selectedSet.has(id)) return false
  }
  return true
}

/**
 * Grade a multi-choice answer (single correct selection from 7 + not-applicable).
 */
export function gradeMultiChoice(
  selectedId: string,
  choices: Array<{ id: string; isCorrect: boolean }>
): boolean {
  return choices.find(c => c.id === selectedId)?.isCorrect ?? false
}
