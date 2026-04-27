'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { Question } from '@/types/question'

interface MultiSelectQuestionProps {
  question: Question
  /** Called with the ids of all selected choices. */
  onSubmit: (choiceIds: string[]) => void
}

/**
 * Multi-answer multiple choice question.
 * Presents up to 7 options + a "Not applicable" option (always last).
 * Any number of choices can be selected simultaneously.
 */
export function MultiSelectQuestion({ question, onSubmit }: MultiSelectQuestionProps) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

  const choices = question.choices ?? []

  const toggle = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Question text */}
      <div className="space-y-1">
        <p className="text-base font-medium text-zinc-100 leading-snug">
          {question.questionText}
        </p>
        <p className="text-xs text-zinc-500">Select all that apply</p>
      </div>

      {/* Choice list */}
      <div className="flex flex-col gap-2">
        {choices.map((choice) => {
          const isSelected = selectedIds.has(choice.id)
          const isNotApplicable = choice.text.toLowerCase() === 'not applicable'

          return (
            <button
              key={choice.id}
              type="button"
              onClick={() => toggle(choice.id)}
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
                {/* Checkbox indicator */}
                <span
                  className={cn(
                    'flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors',
                    isSelected
                      ? 'border-violet-400 bg-violet-500'
                      : 'border-zinc-600'
                  )}
                >
                  {isSelected && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 12 12"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-3 w-3"
                    >
                      <polyline points="2,6 5,9 10,3" />
                    </svg>
                  )}
                </span>
                {choice.text}
              </span>
            </button>
          )
        })}
      </div>

      {/* Selection count + submit */}
      <div className="flex flex-col gap-2">
        {selectedIds.size > 0 && (
          <p className="text-xs text-center text-zinc-500">
            {selectedIds.size} {selectedIds.size === 1 ? 'answer' : 'answers'} selected
          </p>
        )}
        <button
          type="button"
          disabled={selectedIds.size === 0}
          onClick={() => onSubmit(Array.from(selectedIds))}
          className="w-full rounded-lg px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 hover:from-violet-500 hover:via-purple-500 hover:to-fuchsia-500 active:scale-[0.98] transition-all shadow-lg shadow-purple-900/40 disabled:opacity-40 disabled:pointer-events-none"
        >
          Submit {selectedIds.size > 0 ? `${selectedIds.size} ${selectedIds.size === 1 ? 'answer' : 'answers'}` : 'answer'}
        </button>
      </div>
    </div>
  )
}
