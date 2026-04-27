import { Suspense } from 'react'
import { GameSetupContent } from './GameSetupContent'

/**
 * Game Setup page.
 * Thin server wrapper — Suspense is required by Next.js when a child
 * client component calls useSearchParams().
 */
export default function GameSetupPage() {
  return (
    <Suspense>
      <GameSetupContent />
    </Suspense>
  )
}
