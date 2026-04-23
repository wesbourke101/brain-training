import type { QuestionType } from './question'

/**
 * Computed metrics for a completed game session.
 * Calculated client-side by lib/game/scoring.ts from raw session data.
 */
export interface SessionMetrics {
  /** Fraction of all questions answered correctly (0–1). */
  overallAccuracy: number
  /**
   * Accuracy broken down by how many stories back the question reached.
   * Key is delay (1, 2, etc). Higher delay = more interference = expected lower accuracy.
   * e.g. { 1: 0.80, 2: 0.55 }
   */
  accuracyByDelay: Record<number, number>
  /**
   * Accuracy broken down by question format.
   * e.g. { 'type-in': 0.60, 'multi-choice': 0.85, 'multi-select': 0.50 }
   */
  accuracyByType: Record<QuestionType, number>
  /** Average words per minute across all paragraphs in the session. */
  avgWpm: number
  /** Average question response time in milliseconds. */
  avgResponseTimeMs: number
  /** How many stories were fully completed (user didn't quit early). */
  storiesCompleted: number
  /** Total number of questions asked during the session. */
  totalQuestions: number
  /** Total number of correct answers. */
  totalCorrect: number
}
