'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import type { Question } from '@/types/question'

interface TypeInQuestionProps {
  question: Question
  onSubmit: (answer: string) => void
}

/**
 * Free-text answer input for type-in questions.
 * Used for names, locations, colours, quotes, numbers — anything
 * the user needs to recall as a typed string.
 */
export function TypeInQuestion({ question, onSubmit }: TypeInQuestionProps) {
  const [value, setValue] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = value.trim()
    if (!trimmed) return
    onSubmit(trimmed)
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Question text */}
      <p className="text-base font-medium text-zinc-100 leading-snug">
        {question.questionText}
      </p>

      {/* Input + submit */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <Input
          autoFocus
          placeholder="Type your answer…"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="h-11 text-base bg-zinc-800 border-zinc-700 text-zinc-100 placeholder:text-zinc-500 focus-visible:border-violet-500 focus-visible:ring-violet-500/30"
        />
        <button
          type="submit"
          disabled={!value.trim()}
          className="w-full rounded-lg px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 hover:from-violet-500 hover:via-purple-500 hover:to-fuchsia-500 active:scale-[0.98] transition-all shadow-lg shadow-purple-900/40 disabled:opacity-40 disabled:pointer-events-none"
        >
          Submit answer
        </button>
      </form>
    </div>
  )
}
