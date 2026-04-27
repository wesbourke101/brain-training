'use client'

import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ReadingShellProps {
  children: React.ReactNode
  /** Called when the user taps the quit button. Handle navigation in the parent. */
  onQuit: () => void
  /** Optional extra classes on the root element. */
  className?: string
}

/**
 * Full-screen, distraction-free wrapper used ONLY on /game/play.
 *
 * Design principles:
 * - No navigation bar (zero distractions during reading)
 * - Dark background to reduce eye strain during extended reading
 * - Single quit button in the top-right corner
 * - Content centred with a comfortable max reading width
 */
export function ReadingShell({ children, onQuit, className }: ReadingShellProps) {
  return (
    <div
      className={cn(
        'min-h-screen flex flex-col bg-zinc-950 text-zinc-100',
        className
      )}
    >
      {/* ── Minimal header — quit only ───────────────────────────────── */}
      <header className="flex items-center justify-between px-4 py-3 sm:px-8">
        {/* Logo text — muted, not a link (keep focus on reading) */}
        <span className="text-xs font-medium tracking-widest uppercase text-zinc-600 select-none">
          Brain Training
        </span>

        {/* Quit button */}
        <button
          onClick={onQuit}
          className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors"
          aria-label="Quit session"
        >
          <X className="h-3.5 w-3.5" />
          <span>Quit</span>
        </button>
      </header>

      {/* ── Reading content area ──────────────────────────────────────── */}
      <main className="flex-1 flex flex-col mx-auto w-full max-w-2xl px-4 sm:px-8 py-6">
        {children}
      </main>
    </div>
  )
}
