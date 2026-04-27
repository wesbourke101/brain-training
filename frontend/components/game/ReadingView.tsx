'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import type { Paragraph } from '@/types/story'

interface ReadingViewProps {
  paragraph: Paragraph
  storyOrder: number
  storyTitle: string
  totalParagraphs: number
  onAdvance: () => void
}

const TAPS_REQUIRED = 3

/**
 * Displays one paragraph at a time.
 * Advancing requires 3 taps to prevent accidental navigation —
 * the first tap shows a confirmation popup with a live countdown.
 */
export function ReadingView({
  paragraph,
  storyOrder,
  storyTitle,
  totalParagraphs,
  onAdvance,
}: ReadingViewProps) {
  const [tapCount, setTapCount] = useState(0)

  const progressPercent = Math.round(
    ((paragraph.index + 1) / totalParagraphs) * 100
  )

  const tapsRemaining = TAPS_REQUIRED - tapCount
  const showConfirm = tapCount > 0

  const handleNextTap = () => {
    const next = tapCount + 1
    if (next >= TAPS_REQUIRED) {
      // Advance and reset for the next paragraph
      setTapCount(0)
      onAdvance()
    } else {
      setTapCount(next)
    }
  }

  const handleCancel = () => {
    setTapCount(0)
  }

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">

      {/* ── Story header ─────────────────────────────────────────────── */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-zinc-500">
            Story {storyOrder}
          </p>
          <h2 className="text-lg font-semibold text-zinc-100 leading-snug">
            {storyTitle}
          </h2>
        </div>
        <span className="text-xs text-zinc-500 tabular-nums shrink-0">
          {paragraph.index + 1} / {totalParagraphs}
        </span>
      </div>

      {/* ── Progress bar ─────────────────────────────────────────────── */}
      <div className="h-0.5 w-full rounded-full bg-zinc-800">
        <div
          className="h-0.5 rounded-full bg-zinc-400 transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* ── Paragraph text ───────────────────────────────────────────── */}
      <p className="text-zinc-200 text-lg leading-relaxed">
        {paragraph.text}
      </p>

      {/* ── Advance button ───────────────────────────────────────────── */}
      <div className="flex justify-end">
        <Button onClick={handleNextTap} size="lg">
          Next →
        </Button>
      </div>

      {/* ── 3-tap confirmation popup ─────────────────────────────────── */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          {/* Backdrop — clicking it cancels */}
          <div
            className="absolute inset-0 bg-black/60"
            onClick={handleCancel}
            aria-hidden="true"
          />

          {/* Card */}
          <div className="relative z-10 flex flex-col items-center gap-5 rounded-2xl bg-zinc-900 border border-zinc-700 px-8 py-7 text-center max-w-xs w-full shadow-2xl">

            {/* Cancel — red X top-right */}
            <button
              onClick={handleCancel}
              aria-label="Cancel"
              className="absolute top-3 right-3 flex h-7 w-7 items-center justify-center rounded-full text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
              </svg>
            </button>

            {/* Tap counter ring */}
            <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-violet-500/50 bg-violet-500/10">
              <span className="text-3xl font-bold text-violet-300 tabular-nums">
                {tapsRemaining}
              </span>
            </div>

            <div className="space-y-1">
              <p className="text-sm font-semibold text-zinc-100">
                You can&apos;t go back
              </p>
              <p className="text-xs text-zinc-400">
                Tap <span className="text-zinc-200 font-medium">Next</span> {tapsRemaining} more{' '}
                {tapsRemaining === 1 ? 'time' : 'times'} to continue
              </p>
            </div>

            {/* Purple gradient Next button */}
            <button
              onClick={handleNextTap}
              className="w-full rounded-lg px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 hover:from-violet-500 hover:via-purple-500 hover:to-fuchsia-500 active:scale-[0.98] transition-all shadow-lg shadow-purple-900/40"
            >
              Next →
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
