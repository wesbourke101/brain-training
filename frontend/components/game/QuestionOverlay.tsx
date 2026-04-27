'use client'

import { useState } from 'react'
import { TypeInQuestion } from './TypeInQuestion'
import { MultiChoiceQuestion } from './MultiChoiceQuestion'
import { MultiSelectQuestion } from './MultiSelectQuestion'
import { QuestionFeedback } from './QuestionFeedback'

// ── Shared question shape (mirrors the DB model, null-safe) ──────────────────
export interface OverlayQuestion {
  id: string
  storyId: string
  questionText: string
  questionType: 'type-in' | 'multi-choice' | 'multi-select'
  correctAnswer: string | null
  choices: Array<{ id: string; text: string; isCorrect: boolean }> | null
  isMemoryPrompt: boolean
  triggerAfterParagraph: number | null
}

interface FeedbackData {
  isCorrect: boolean
  correctAnswer: string | string[]
  userAnswer: string | string[]
}

interface QuestionOverlayProps {
  question: OverlayQuestion
  /**
   * Called as soon as the answer is submitted (before feedback is shown).
   * Use this to record the attempt in session state.
   */
  onSubmit: (answer: string | string[], isCorrect: boolean) => void
  /** Called when the user dismisses the feedback card ("Continue reading →"). */
  onFeedbackDismiss: () => void
}

/**
 * Full-screen overlay that:
 * 1. Dims the reading content behind it with a dark backdrop
 * 2. Renders the correct question component for the given `questionType`
 * 3. Handles the feedback phase internally, then calls `onFeedbackDismiss`
 */
export function QuestionOverlay({ question, onSubmit, onFeedbackDismiss }: QuestionOverlayProps) {
  const [feedback, setFeedback] = useState<FeedbackData | null>(null)

  // ── Handlers ────────────────────────────────────────────────────────────────

  const handleTypeIn = (answer: string) => {
    const isCorrect =
      answer.trim().toLowerCase() === (question.correctAnswer ?? '').toLowerCase()
    const fb: FeedbackData = {
      isCorrect,
      correctAnswer: question.correctAnswer ?? '',
      userAnswer: answer,
    }
    setFeedback(fb)
    onSubmit(answer, isCorrect)
  }

  const handleMultiChoice = (choiceId: string) => {
    const chosen = question.choices?.find((c) => c.id === choiceId)
    const correct = question.choices?.find((c) => c.isCorrect)
    const isCorrect = chosen?.isCorrect ?? false
    const fb: FeedbackData = {
      isCorrect,
      correctAnswer: correct?.text ?? '',
      userAnswer: chosen?.text ?? '',
    }
    setFeedback(fb)
    onSubmit(choiceId, isCorrect)
  }

  const handleMultiSelect = (choiceIds: string[]) => {
    const correctIds = (question.choices ?? []).filter((c) => c.isCorrect).map((c) => c.id)
    const isCorrect =
      choiceIds.length === correctIds.length &&
      choiceIds.every((id) => correctIds.includes(id))
    const correctTexts = (question.choices ?? [])
      .filter((c) => c.isCorrect)
      .map((c) => c.text)
    const userTexts = (question.choices ?? [])
      .filter((c) => choiceIds.includes(c.id))
      .map((c) => c.text)
    const fb: FeedbackData = { isCorrect, correctAnswer: correctTexts, userAnswer: userTexts }
    setFeedback(fb)
    onSubmit(choiceIds, isCorrect)
  }

  // ── Render ───────────────────────────────────────────────────────────────────

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4">

      {/* ── Dark backdrop — dims the reading content behind ────────────────── */}
      <div className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm" />

      {/* ── Question / Feedback card ──────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-md">

        {feedback ? (
          <QuestionFeedback
            isCorrect={feedback.isCorrect}
            questionText={question.questionText}
            correctAnswer={feedback.correctAnswer}
            userAnswer={feedback.userAnswer}
            onContinue={() => {
              setFeedback(null)
              onFeedbackDismiss()
            }}
          />
        ) : (
          <>
            {question.questionType === 'type-in' && (
              <TypeInQuestion question={question} onSubmit={handleTypeIn} />
            )}
            {question.questionType === 'multi-choice' && (
              <MultiChoiceQuestion question={question} onSubmit={handleMultiChoice} />
            )}
            {question.questionType === 'multi-select' && (
              <MultiSelectQuestion question={question} onSubmit={handleMultiSelect} />
            )}
          </>
        )}
      </div>
    </div>
  )
}
