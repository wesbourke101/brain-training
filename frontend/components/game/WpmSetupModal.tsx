'use client'

import { useState } from 'react'
import Image from 'next/image'

interface WpmSetupModalProps {
  onSave: (wpm: number) => void
}

type Mode = 'choose' | 'input'

const MIN_WPM = 50
const MAX_WPM = 1500
const DEFAULT_WPM = 200

/**
 * Modal shown when no WPM baseline exists for the user.
 * Offers two paths: enter a known WPM, or take a timed reading test.
 *
 * The timed reading test ("Read to calibrate") is planned but not yet
 * implemented — see EPICS.md Epic B, Story B.5.
 */
export function WpmSetupModal({ onSave }: WpmSetupModalProps) {
  const [mode, setMode] = useState<Mode>('choose')
  const [inputValue, setInputValue] = useState(String(DEFAULT_WPM))
  const [error, setError] = useState('')

  const handleSave = () => {
    const num = Number(inputValue)
    if (isNaN(num) || num < MIN_WPM || num > MAX_WPM) {
      setError(`Please enter a number between ${MIN_WPM} and ${MAX_WPM}.`)
      return
    }
    onSave(Math.round(num))
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Card */}
      <div className="relative z-10 w-full max-w-md rounded-2xl bg-white shadow-2xl overflow-hidden">

        {/* Header strip */}
        <div className="flex items-center gap-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-5">
          <Image src="/brain.png" alt="" width={44} height={44} style={{ objectFit: 'contain' }} />
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-violet-200">
              One-time setup
            </p>
            <h2 className="text-lg font-bold text-white leading-tight">
              How fast do you read?
            </h2>
          </div>
        </div>

        <div className="px-6 py-6 flex flex-col gap-5">

          {mode === 'choose' && (
            <>
              <p className="text-sm text-zinc-500 leading-relaxed">
                We use your reading speed to pace the game correctly — so questions arrive at the right moment, not too early or too late.
              </p>

              <div className="flex flex-col gap-3">
                {/* Option 1 — enter a number */}
                <button
                  onClick={() => setMode('input')}
                  className="flex items-start gap-4 rounded-xl border-2 border-violet-200 bg-violet-50 p-4 text-left hover:border-violet-400 hover:bg-violet-100 transition-colors group"
                >
                  <span className="text-2xl mt-0.5">🔢</span>
                  <div>
                    <p className="font-semibold text-zinc-800 group-hover:text-violet-700 transition-colors">
                      I know my WPM
                    </p>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      Enter a number — average adult reads 200–250 WPM
                    </p>
                  </div>
                </button>

                {/* Option 2 — timed reading test (coming soon) */}
                <div className="relative flex items-start gap-4 rounded-xl border-2 border-zinc-100 bg-zinc-50 p-4 text-left opacity-60 cursor-not-allowed">
                  <span className="text-2xl mt-0.5">⏱️</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-zinc-600">Read to calibrate</p>
                      <span className="rounded-full bg-zinc-200 px-2 py-0.5 text-xs font-medium text-zinc-500">
                        Coming soon
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      Read a passage for 60 seconds — click the word you stopped on
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}

          {mode === 'input' && (
            <>
              <button
                onClick={() => { setMode('choose'); setError('') }}
                className="flex items-center gap-1 text-xs text-zinc-400 hover:text-zinc-600 transition-colors w-fit"
              >
                ← Back
              </button>

              <div>
                <label htmlFor="wpm-input" className="block text-sm font-medium text-zinc-700 mb-2">
                  Your reading speed (words per minute)
                </label>
                <input
                  id="wpm-input"
                  type="number"
                  min={MIN_WPM}
                  max={MAX_WPM}
                  autoFocus
                  value={inputValue}
                  onChange={(e) => { setInputValue(e.target.value); setError('') }}
                  onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                  placeholder="e.g. 220"
                  className="w-full rounded-lg border border-zinc-200 px-4 py-2.5 text-base text-zinc-900 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all"
                />
                {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
                <p className="mt-2 text-xs text-zinc-400">
                  Not sure? The average adult reads around 200–250 WPM. You can re-test any time from Settings.
                </p>
              </div>

              <button
                onClick={handleSave}
                className="w-full rounded-lg px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 hover:from-violet-500 hover:via-purple-500 hover:to-fuchsia-500 active:scale-[0.98] transition-all shadow-lg shadow-purple-900/20"
              >
                Save and continue
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
