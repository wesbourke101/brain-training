import { Suspense } from 'react'
import { GamePlayContent } from './GamePlayContent'

/**
 * /game/play — thin server wrapper.
 * GamePlayContent is split out so useSearchParams() lives inside <Suspense>.
 */
export default function GamePlayPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
          <p className="text-sm text-zinc-500 animate-pulse">Loading…</p>
        </div>
      }
    >
      <GamePlayContent />
    </Suspense>
  )
}
