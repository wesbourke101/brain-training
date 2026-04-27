'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { Question } from '@/types/question'

interface MultiChoiceQuestionProps {
  question: Question
  /** Called with the id of the selected choice. */
  onSubmit: (choiceId: string) => void
}

/**
 * Single-answer multiple choice question.
 * Presents up to 7 options + a "Not applicable" option (always last).
 * Exactly one choice can be selected at a time.
 */
export function MultiChoiceQuestion({ question, onSubmit }: MultiChoiceQuestionProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const choices = question.choices ?? []

  return (
    <div className="flex flex-col gap-6">
      {/* Question text */}
      <p className="text-base font-medium text-zinc-100 leading-snug">
        {question.questionText}
      </p>

      {/* Choice list */}
      <div className="flex flex-col gap-2">
        {choices.map((choice) => {
          const isSelected = selectedId === choice.id
          const isNotApplicable = choice.text.toLowerCase() === 'not applicable'

          return (
            <button
              key={choice.id}
              type="button"
              onClick={() => setSelectedId(choice.id)}
              className={cn(
                'w-full rounded-xl border px-4 py-3 text-left text-sm transition-all',
                isSelected
                  ? 'border-violet-500 bg-violet-500/15 text-violet-200'
                  : isNotApplicable
                  ? 'border-zinc-700 bg-zinc-900/50 text-zinc-500 hover:border-zinc-600 hover:text-zinc-400'
                  : 'border-zinc-700 bg-zinc-900/50 text-zinc-300 hover:border-zinc-500 hover:bg-zinc-800/60 hover:text-zinc-100'
              )}
            >
              <span className="flex items-center gap-3">
                {/* Radio indicator */}
                <span
                  className={cn(
                    'flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors',
                    isSelected
                      ? 'border-violet-400 bg-violet-500'
                      : 'border-zinc-600'
                  )}
                >
                  {isSelected && (
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  )}
                </span>
                {choice.text}
              </span>
            </button>
          )
        })}
      </div>

      {/* Submit */}
      <button
        type="button"
        disabled={!selectedId}
        onClick={() => selectedId && onSubmit(selectedId)}
        className="w-full rounded-lg px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 hover:from-violet-500 hover:via-purple-500 hover:to-fuchsia-500 active:scale-[0.98] transition-all shadow-lg shadow-purple-900/40 disabled:opacity-40 disabled:pointer-events-none"
      >
        Submit answer
      </button>
    </div>
  )
}
