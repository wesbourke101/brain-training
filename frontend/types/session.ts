import type { CategorySlug } from './story'
import type { QuestionType } from './question'

/** Time the user spent on a single paragraph. */
export interface ParagraphTiming {
  paragraphIndex: number
  /** Milliseconds from paragraph appearing to user tapping "continue". */
  timeSpentMs: number
}

/** The user's response to a single question during a session. */
export interface QuestionResponse {
  questionId: string
  /** Which story (1-based) the question was about. */
  aboutStoryOrder: number
  /** Which story (1-based) the user was reading when asked. */
  askedAtStoryOrder: number
  /** askedAtStoryOrder - aboutStoryOrder. Higher = more interference. */
  delay: number
  questionType: QuestionType
  /** String for type-in, string[] for multi-select. */
  userAnswer: string | string[]
  isCorrect: boolean
  /** Milliseconds from question appearing to user submitting. */
  responseTimeMs: number
}

/** Data captured for one story within a session. */
export interface SessionStory {
  storyId: string
  /** Position in the session (1-based). */
  storyOrder: number
  startedAt: string
  completedAt: string | null
  /** Total reading time in ms (excludes time spent on question overlays). */
  readingTimeMs: number
  paragraphTimings: ParagraphTiming[]
  questionsAnswered: QuestionResponse[]
}

/** A complete game session from setup to results. */
export interface GameSession {
  id: string
  /** Null until auth is wired up (v1.5). */
  userId: string | null
  categorySlug: CategorySlug
  /** How many stories were selected (3–15). */
  storyCount: number
  startedAt: string
  /** Null if session was abandoned. */
  endedAt: string | null
  stories: SessionStory[]
}
