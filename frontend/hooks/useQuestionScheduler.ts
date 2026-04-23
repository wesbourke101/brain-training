'use client'

import { useMemo, useCallback } from 'react'
import type { Story } from '@/types/story'
import type { Question, ScheduledQuestion } from '@/types/question'
import {
  buildSchedule,
  getNextQuestion,
  getResultsQuestions,
} from '@/lib/game/questionScheduler'

interface UseQuestionSchedulerReturn {
  /** The full ordered schedule built at session start. */
  schedule: ScheduledQuestion[]
  /**
   * Return the next question due at the given position.
   * Returns null if nothing is scheduled right now.
   */
  getNext: (
    currentStoryOrder: number,
    currentParagraphIndex: number,
    answeredIds: Set<string>
  ) => ScheduledQuestion | null
  /** Return all questions to display on the results screen. */
  getResultsScreen: (answeredIds: Set<string>) => ScheduledQuestion[]
}

/**
 * Thin hook wrapper around lib/game/questionScheduler.
 * Builds the schedule once on mount (memoised) and exposes query helpers.
 */
export function useQuestionScheduler(
  stories: Story[],
  questionsByStoryId: Record<string, Question[]>
): UseQuestionSchedulerReturn {
  const schedule = useMemo(
    () => buildSchedule(stories, questionsByStoryId),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [stories.map(s => s.id).join(',')]
  )

  const getNext = useCallback(
    (
      currentStoryOrder: number,
      currentParagraphIndex: number,
      answeredIds: Set<string>
    ) => getNextQuestion(schedule, currentStoryOrder, currentParagraphIndex, answeredIds),
    [schedule]
  )

  const getResultsScreen = useCallback(
    (answeredIds: Set<string>) => getResultsQuestions(schedule, answeredIds),
    [schedule]
  )

  return { schedule, getNext, getResultsScreen }
}
