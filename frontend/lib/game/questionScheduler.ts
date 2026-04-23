import type { Story } from '@/types/story'
import type { Question, ScheduledQuestion } from '@/types/question'

// ---------------------------------------------------------------------------
// Scheduling rules (from docs/GAME_LOOP.md)
// ---------------------------------------------------------------------------
// Story 1:  MemoryPrompts before reading. 1 mid-story question during reading.
// Story 2:  4–5 questions about Story 1 distributed across paragraphs.
// Story 3:  1–2 about Story 1  +  2–3 about Story 2.
// Story N+: 1–2 about Story N-2  +  2–3 about Story N-1.
// Results:  All remaining questions about the last story.
//
// MemoryPrompts → atParagraphIndex = -1  (shown BEFORE story begins)
// Results screen → atStoryOrder = stories.length + 1  (sentinel)
// ---------------------------------------------------------------------------

/** Sentinel value: question appears on the results screen after the session. */
export const RESULTS_SCREEN_STORY_ORDER = -1

/**
 * Build the complete question schedule for a session upfront.
 * Returns a flat, sorted list of ScheduledQuestion objects.
 */
export function buildSchedule(
  stories: Story[],
  questionsByStoryId: Record<string, Question[]>
): ScheduledQuestion[] {
  const schedule: ScheduledQuestion[] = []
  // Track which question IDs have already been placed so we never duplicate.
  const placed = new Set<string>()

  for (let i = 0; i < stories.length; i++) {
    const storyOrder = i + 1
    const story = stories[i]
    const paragraphCount = story.paragraphs.length
    const allQuestions = questionsByStoryId[story.id] ?? []

    const memoryPrompts = allQuestions.filter(q => q.isMemoryPrompt)
    const regularQs = allQuestions.filter(q => !q.isMemoryPrompt)

    // ------------------------------------------------------------------
    // 1. MemoryPrompts: shown BEFORE this story begins (atParagraphIndex -1)
    // ------------------------------------------------------------------
    for (const q of memoryPrompts) {
      if (placed.has(q.id)) continue
      schedule.push({
        question: q,
        aboutStoryOrder: storyOrder,
        atStoryOrder: storyOrder,
        atParagraphIndex: -1,
      })
      placed.add(q.id)
    }

    // ------------------------------------------------------------------
    // 2. Story 1 only: 1 mid-story question during its own reading
    // ------------------------------------------------------------------
    if (storyOrder === 1 && regularQs.length > 0) {
      const midQ =
        regularQs.find(q => q.triggerAfterParagraph !== null) ?? regularQs[0]
      if (!placed.has(midQ.id)) {
        schedule.push({
          question: midQ,
          aboutStoryOrder: 1,
          atStoryOrder: 1,
          atParagraphIndex: midQ.triggerAfterParagraph ?? Math.max(1, Math.floor(paragraphCount / 2)),
        })
        placed.add(midQ.id)
      }
    }

    // ------------------------------------------------------------------
    // 3. Stories 2+: distribute previous stories' questions during THIS story
    // ------------------------------------------------------------------
    if (storyOrder >= 2) {
      const prevStory = stories[i - 1]
      const prevQs = (questionsByStoryId[prevStory.id] ?? [])
        .filter(q => !q.isMemoryPrompt && !placed.has(q.id))

      // Story 2 gets 4–5 questions about story 1.
      // Story 3+ gets 2–3 questions about the immediately prior story.
      const delay1Count = storyOrder === 2
        ? clamp(prevQs.length, 0, randomBetween(4, 5))
        : clamp(prevQs.length, 0, randomBetween(2, 3))

      const delay1Batch = prevQs.slice(0, delay1Count)
      const delay1Scheduled = distributeAcrossParagraphs(
        delay1Batch,
        paragraphCount,
        storyOrder - 1,
        storyOrder
      )
      for (const sq of delay1Scheduled) {
        schedule.push(sq)
        placed.add(sq.question.id)
      }

      // Story 3+: add 1–2 older questions (delay 2) from story N-2
      if (storyOrder >= 3) {
        const olderStory = stories[i - 2]
        const olderQs = (questionsByStoryId[olderStory.id] ?? [])
          .filter(q => !q.isMemoryPrompt && !placed.has(q.id))

        const delay2Count = clamp(olderQs.length, 0, randomBetween(1, 2))
        const delay2Batch = olderQs.slice(0, delay2Count)
        const delay2Scheduled = distributeAcrossParagraphs(
          delay2Batch,
          paragraphCount,
          storyOrder - 2,
          storyOrder
        )
        for (const sq of delay2Scheduled) {
          schedule.push(sq)
          placed.add(sq.question.id)
        }
      }
    }
  }

  // ------------------------------------------------------------------
  // 4. Results screen: all remaining unplaced questions about the last story
  // ------------------------------------------------------------------
  const lastStory = stories[stories.length - 1]
  const lastStoryQs = (questionsByStoryId[lastStory.id] ?? [])
    .filter(q => !q.isMemoryPrompt && !placed.has(q.id))

  for (const q of lastStoryQs) {
    schedule.push({
      question: q,
      aboutStoryOrder: stories.length,
      atStoryOrder: RESULTS_SCREEN_STORY_ORDER,
      atParagraphIndex: -1,
    })
    placed.add(q.id)
  }

  return sortSchedule(schedule)
}

/**
 * Return the next due question given current position in the session.
 * Returns null if no question is scheduled at this exact position.
 *
 * @param currentStoryOrder  1-based index of the story currently being read
 * @param currentParagraphIndex  Paragraph the user just finished reading (-1 = before story)
 * @param answeredIds  Set of question IDs already answered this session
 */
export function getNextQuestion(
  schedule: ScheduledQuestion[],
  currentStoryOrder: number,
  currentParagraphIndex: number,
  answeredIds: Set<string>
): ScheduledQuestion | null {
  return (
    schedule.find(
      sq =>
        !answeredIds.has(sq.question.id) &&
        sq.atStoryOrder === currentStoryOrder &&
        sq.atParagraphIndex === currentParagraphIndex
    ) ?? null
  )
}

/**
 * Return all questions scheduled for the results screen (about the last story).
 */
export function getResultsQuestions(
  schedule: ScheduledQuestion[],
  answeredIds: Set<string>
): ScheduledQuestion[] {
  return schedule.filter(
    sq =>
      sq.atStoryOrder === RESULTS_SCREEN_STORY_ORDER &&
      !answeredIds.has(sq.question.id)
  )
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Spread questions evenly across paragraph breaks within a story.
 * Never places a question at paragraph 0 (first impression — let them settle in).
 */
function distributeAcrossParagraphs(
  questions: Question[],
  paragraphCount: number,
  aboutStoryOrder: number,
  atStoryOrder: number
): ScheduledQuestion[] {
  if (questions.length === 0 || paragraphCount <= 1) return []

  // Available break points: after paragraphs 1 … N-1
  const slots = paragraphCount - 1
  const step = Math.max(1, Math.floor(slots / questions.length))

  return questions.map((question, idx) => ({
    question,
    aboutStoryOrder,
    atStoryOrder,
    atParagraphIndex: 1 + idx * step,
  }))
}

function sortSchedule(schedule: ScheduledQuestion[]): ScheduledQuestion[] {
  return [...schedule].sort((a, b) => {
    // Results screen questions go last
    if (a.atStoryOrder === RESULTS_SCREEN_STORY_ORDER) return 1
    if (b.atStoryOrder === RESULTS_SCREEN_STORY_ORDER) return -1
    if (a.atStoryOrder !== b.atStoryOrder) return a.atStoryOrder - b.atStoryOrder
    return a.atParagraphIndex - b.atParagraphIndex
  })
}

function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value))
}
