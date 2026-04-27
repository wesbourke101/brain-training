'use client'

import { Button } from '@/components/ui/button'
import type { Question } from '@/types/question'

interface MemoryPromptProps {
  question: Question
  storyTitle: string
  onDismiss: () => void
}

/**
 * Full-screen overlay shown before a story begins.
 * Displays a memory instruction the user should hold in mind while reading.
 * Calls onDismiss when the user is ready to begin reading.
 */
export function MemoryPrompt({ question, storyTitle, onDismiss }: MemoryPromptProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm p-6 text-foreground">
      <div className="flex flex-col items-center gap-6 max-w-md w-full text-center">

        {/* Icon */}
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-3xl">
          🧠
        </div>

        {/* Heading */}
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Before you begin
          </p>
          <h2 className="text-xl font-semibold">{storyTitle}</h2>
        </div>

        {/* Memory instruction */}
        <div className="rounded-xl border border-border bg-muted/50 px-6 py-5 text-sm leading-relaxed">
          {question.questionText}
        </div>

        <p className="text-xs text-muted-foreground">
          Keep this in mind as you read. You will be tested on it later.
        </p>

        <Button size="lg" onClick={onDismiss}>
          Begin Reading
        </Button>
      </div>
    </div>
  )
}
