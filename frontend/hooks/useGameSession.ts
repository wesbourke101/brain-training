'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import type { Story, CategorySlug } from '@/types/story'
import type { Question, ScheduledQuestion } from '@/types/question'
import type { GameSession, SessionStory, QuestionResponse } from '@/types/session'
import type { SessionMetrics } from '@/types/metrics'
import { useReadingTimer } from './useReadingTimer'
import { useQuestionScheduler } from './useQuestionScheduler'
import { calculateSessionMetrics } from '@/lib/game/scoring'
import { gradeTypeIn, gradeMultiChoice, gradeMultiSelect } from '@/lib/game/scoring'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type GamePhase =
  | 'loading'        // Fetching stories / building schedule
  | 'memory-prompt'  // Showing MemoryPrompt before story N begins
  | 'reading'        // User is reading a paragraph
  | 'question'       // Question overlay is visible
  | 'feedback'       // Showing right/wrong + correct answer
  | 'complete'       // All stories done, ready for results

interface UseGameSessionReturn {
  // ── State ────────────────────────────────────────────────────────────────
  phase: GamePhase
  /** Current story (1-based). */
  currentStoryOrder: number
  /** Current paragraph index within the story. */
  currentParagraphIndex: number
  currentStory: Story | null
  /** MemoryPrompt or mid-story question currently displayed. Null if phase !== 'question'. */
  activeQuestion: ScheduledQuestion | null
  /** The user's last response — used by QuestionFeedback. */
  lastResponse: QuestionResponse | null
  /** Live elapsed ms on current paragraph (for optional visible timer). */
  currentElapsedMs: number
  /** Final computed metrics. Only populated when phase === 'complete'. */
  sessionMetrics: SessionMetrics | null

  // ── Actions ───────────────────────────────────────────────────────────────
  /** User taps "Got it" on a MemoryPrompt. Begins reading. */
  dismissMemoryPrompt: () => void
  /** User taps "Continue" to advance to the next paragraph. */
  advanceParagraph: () => void
  /** User submits an answer to the active question. */
  submitAnswer: (answer: string | string[]) => void
  /** User taps "Continue reading" on the feedback screen. */
  dismissFeedback: () => void
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

/**
 * Main game state machine. Used exclusively by app/game/play/page.tsx.
 *
 * State transitions:
 *   loading → memory-prompt (if story has MemoryPrompt)
 *   loading → reading       (if no MemoryPrompt)
 *   memory-prompt → reading
 *   reading → question      (when a question is scheduled at this paragraph)
 *   reading → memory-prompt (when advancing to a story that has a MemoryPrompt)
 *   reading → complete      (when last paragraph of last story is advanced)
 *   question → feedback
 *   feedback → reading
 */
export function useGameSession(
  stories: Story[],
  questionsByStoryId: Record<string, Question[]>,
  categorySlug: CategorySlug
): UseGameSessionReturn {
  // ── Session skeleton built once ─────────────────────────────────────────
  const sessionId = useRef(crypto.randomUUID())
  const sessionStartedAt = useRef(new Date().toISOString())

  const { schedule, getNext, getResultsScreen } = useQuestionScheduler(stories, questionsByStoryId)
  const timer = useReadingTimer()

  // ── Core state ───────────────────────────────────────────────────────────
  const [phase, setPhase] = useState<GamePhase>('loading')
  const [currentStoryOrder, setCurrentStoryOrder] = useState(1)
  const [currentParagraphIndex, setCurrentParagraphIndex] = useState(0)
  const [activeQuestion, setActiveQuestion] = useState<ScheduledQuestion | null>(null)
  const [lastResponse, setLastResponse] = useState<QuestionResponse | null>(null)
  const [answeredIds] = useState(() => new Set<string>())
  const [sessionMetrics, setSessionMetrics] = useState<SessionMetrics | null>(null)
  /**
   * Where to go after the user dismisses question feedback.
   * null  = question was at the end of the story → advance to next story.
   * number = paragraph index to resume reading at.
   */
  const [pendingParagraphIndex, setPendingParagraphIndex] = useState<number | null>(null)

  // Accumulated per-story data
  const sessionStoriesRef = useRef<SessionStory[]>([])

  // ── Helpers ──────────────────────────────────────────────────────────────

  const currentStory = stories[currentStoryOrder - 1] ?? null

  /** Check for a MemoryPrompt at the start of a given story. */
  const getMemoryPrompt = useCallback(
    (storyOrder: number): ScheduledQuestion | null => {
      return (
        schedule.find(
          sq =>
            sq.atStoryOrder === storyOrder &&
            sq.atParagraphIndex === -1 &&
            sq.question.isMemoryPrompt &&
            !answeredIds.has(sq.question.id)
        ) ?? null
      )
    },
    [schedule, answeredIds]
  )

  /** Begin reading paragraph 0 of the given story. */
  const beginReading = useCallback(
    (storyOrder: number) => {
      void storyOrder // storyOrder kept for clarity / future use
      setCurrentParagraphIndex(0)
      timer.startParagraph(0)
      setPhase('reading')
      // Do NOT check for a question here — questions fire after the user has
      // read a paragraph and taps Next, not before they've seen any text.
    },
    [timer]
  )

  /** Move to a new story (or complete the session if no more stories). */
  const advanceToStory = useCallback(
    (nextStoryOrder: number) => {
      if (nextStoryOrder > stories.length) {
        // Session complete
        const fullSession: GameSession = {
          id: sessionId.current,
          userId: null,
          categorySlug,
          storyCount: stories.length,
          startedAt: sessionStartedAt.current,
          endedAt: new Date().toISOString(),
          stories: sessionStoriesRef.current,
        }
        const metrics = calculateSessionMetrics(fullSession)
        setSessionMetrics(metrics)
        setPhase('complete')
        console.log('TODO save to db:', { type: 'session_complete', session: fullSession, metrics })
        return
      }

      setCurrentStoryOrder(nextStoryOrder)
      timer.reset()

      // Check for MemoryPrompt before new story begins
      const prompt = getMemoryPrompt(nextStoryOrder)
      if (prompt) {
        setActiveQuestion(prompt)
        setPhase('memory-prompt')
      } else {
        beginReading(nextStoryOrder)
      }
    },
    [stories.length, categorySlug, timer, getMemoryPrompt, beginReading]
  )

  // ── Initialise on mount ──────────────────────────────────────────────────
  // useRef guard prevents double-invocation in React 18 Strict Mode.
  const initializedRef = useRef(false)
  useEffect(() => {
    if (initializedRef.current) return
    initializedRef.current = true
    advanceToStory(1)
    // advanceToStory is stable (useCallback with stable deps); omitting from
    // deps array intentionally to run this exactly once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ── Actions ──────────────────────────────────────────────────────────────

  const dismissMemoryPrompt = useCallback(() => {
    if (activeQuestion) answeredIds.add(activeQuestion.question.id)
    setActiveQuestion(null)
    beginReading(currentStoryOrder)
  }, [activeQuestion, answeredIds, beginReading, currentStoryOrder])

  const advanceParagraph = useCallback(() => {
    timer.endParagraph()
    const story = stories[currentStoryOrder - 1]
    if (!story) return

    const nextParagraphIndex = currentParagraphIndex + 1
    const isEndOfStory = nextParagraphIndex >= story.paragraphs.length

    // Check for a question AFTER the paragraph the user just finished reading.
    // This ensures the user has seen the source material before being asked about it.
    const scheduledQ = getNext(currentStoryOrder, currentParagraphIndex, answeredIds)

    if (scheduledQ) {
      // Show the question overlay. Remember where to go once feedback is dismissed.
      // null  → question was at the last paragraph; advance story after feedback.
      // number → the next paragraph index to resume reading.
      setPendingParagraphIndex(isEndOfStory ? null : nextParagraphIndex)
      setActiveQuestion(scheduledQ)
      setPhase('question')
      return
    }

    if (isEndOfStory) {
      // No question here — save story and move on immediately.
      const storyData: SessionStory = {
        storyId: story.id,
        storyOrder: currentStoryOrder,
        startedAt: new Date().toISOString(),
        completedAt: new Date().toISOString(),
        readingTimeMs: timer.timings.reduce((s, t) => s + t.timeSpentMs, 0),
        paragraphTimings: timer.timings,
        questionsAnswered: [],
      }
      sessionStoriesRef.current.push(storyData)
      console.log('TODO save to db:', { type: 'story_complete', storyData })
      advanceToStory(currentStoryOrder + 1)
      return
    }

    // Normal advance — next paragraph, no question.
    setCurrentParagraphIndex(nextParagraphIndex)
    timer.startParagraph(nextParagraphIndex)
    setPhase('reading')
  }, [
    timer,
    stories,
    currentStoryOrder,
    currentParagraphIndex,
    getNext,
    answeredIds,
    advanceToStory,
  ])

  const submitAnswer = useCallback(
    (answer: string | string[]) => {
      if (!activeQuestion) return

      const { question } = activeQuestion
      const startTime = Date.now() // approximation — real impl tracks from question appear time

      let isCorrect = false
      if (question.questionType === 'type-in' && question.correctAnswer) {
        isCorrect = gradeTypeIn(answer as string, question.correctAnswer)
      } else if (question.questionType === 'multi-choice' && question.choices) {
        isCorrect = gradeMultiChoice(answer as string, question.choices)
      } else if (question.questionType === 'multi-select' && question.choices) {
        isCorrect = gradeMultiSelect(answer as string[], question.choices)
      }

      const response: QuestionResponse = {
        questionId: question.id,
        aboutStoryOrder: activeQuestion.aboutStoryOrder,
        askedAtStoryOrder: activeQuestion.atStoryOrder,
        delay: activeQuestion.atStoryOrder - activeQuestion.aboutStoryOrder,
        questionType: question.questionType,
        userAnswer: answer,
        isCorrect,
        responseTimeMs: 0, // TODO: track from question appear time
      }

      answeredIds.add(question.id)
      setLastResponse(response)
      setPhase('feedback')

      console.log('TODO save to db:', { type: 'question_response', response })
    },
    [activeQuestion, answeredIds]
  )

  const dismissFeedback = useCallback(() => {
    setActiveQuestion(null)
    setLastResponse(null)

    if (pendingParagraphIndex === null) {
      // Question was at the end of the story — save story data and advance.
      const story = stories[currentStoryOrder - 1]
      if (story) {
        const storyData: SessionStory = {
          storyId: story.id,
          storyOrder: currentStoryOrder,
          startedAt: new Date().toISOString(),
          completedAt: new Date().toISOString(),
          readingTimeMs: timer.timings.reduce((s, t) => s + t.timeSpentMs, 0),
          paragraphTimings: timer.timings,
          questionsAnswered: [],
        }
        sessionStoriesRef.current.push(storyData)
        console.log('TODO save to db:', { type: 'story_complete', storyData })
      }
      advanceToStory(currentStoryOrder + 1)
    } else {
      // Resume reading at the paragraph the user hasn't seen yet.
      setCurrentParagraphIndex(pendingParagraphIndex)
      timer.startParagraph(pendingParagraphIndex)
      setPhase('reading')
    }

    setPendingParagraphIndex(null)
  }, [pendingParagraphIndex, timer, stories, currentStoryOrder, advanceToStory])

  return {
    phase,
    currentStoryOrder,
    currentParagraphIndex,
    currentStory,
    activeQuestion,
    lastResponse,
    currentElapsedMs: timer.currentElapsedMs,
    sessionMetrics,
    dismissMemoryPrompt,
    advanceParagraph,
    submitAnswer,
    dismissFeedback,
  }
}
