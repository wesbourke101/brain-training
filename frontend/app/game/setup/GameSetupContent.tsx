'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { AppShell } from '@/components/layout/AppShell'
import { PageHeader } from '@/components/layout/PageHeader'
import { CategoryCard } from '@/components/game/CategoryCard'
import { StoryCountPicker } from '@/components/game/StoryCountPicker'
import { Button } from '@/components/ui/button'
import { CATEGORIES, CATEGORY_SLUGS } from '@/lib/game/registry'
import { BrainBackground } from '@/components/ui/BrainBackground'
import { WpmSetupModal } from '@/components/game/WpmSetupModal'
import { useWpmCalibration } from '@/hooks/useWpmCalibration'
import type { CategorySlug } from '@/types/story'

/**
 * Client content for the Game Setup page.
 * Separated from page.tsx so useSearchParams() can be wrapped in <Suspense>.
 */
export function GameSetupContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const preSelected = searchParams.get('category') as CategorySlug | null
  const [selectedSlug, setSelectedSlug] = useState<CategorySlug | null>(
    preSelected && CATEGORIES[preSelected] ? preSelected : null
  )
  const [storyCount, setStoryCount] = useState(3)

  const { needsCalibration, saveWpm } = useWpmCalibration()

  const handleStart = () => {
    if (!selectedSlug) return
    router.push(`/game/play?category=${selectedSlug}&count=${storyCount}`)
  }

  return (
    <AppShell>
      <BrainBackground />

      {/* WPM calibration modal — shown once until user sets their speed */}
      {needsCalibration && <WpmSetupModal onSave={saveWpm} />}

      <div className="relative z-10">
        <PageHeader
          title="Set up your session"
          subtitle="Choose a category and how many stories you want to read."
        />

        {/* ── Step 1: Category grid ───────────────────────────────────── */}
        <section className="mb-8">
          <p className="text-sm font-medium text-muted-foreground mb-3">
            Step 1 — Choose a category
          </p>
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            {CATEGORY_SLUGS.map((slug) => (
              <CategoryCard
                key={slug}
                category={CATEGORIES[slug]}
                selected={selectedSlug === slug}
                onClick={() => setSelectedSlug(slug)}
              />
            ))}
          </div>
        </section>

        {/* ── Step 2: Story count ─────────────────────────────────────── */}
        {selectedSlug && (
          <section className="mb-8 max-w-sm">
            <p className="text-sm font-medium text-muted-foreground mb-4">
              Step 2 — How many stories?
            </p>
            <StoryCountPicker value={storyCount} onChange={setStoryCount} />
          </section>
        )}

        {/* ── Start button ────────────────────────────────────────────── */}
        <Button
          size="lg"
          disabled={selectedSlug === null}
          onClick={handleStart}
        >
          Start session
        </Button>
      </div>
    </AppShell>
  )
}
