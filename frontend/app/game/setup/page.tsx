'use client'

import { useState } from 'react'
import { AppShell } from '@/components/layout/AppShell'
import { PageHeader } from '@/components/layout/PageHeader'
import { CategoryCard } from '@/components/game/CategoryCard'
import { StoryCountPicker } from '@/components/game/StoryCountPicker'
import { Button } from '@/components/ui/button'
import { CATEGORIES, CATEGORY_SLUGS } from '@/lib/game/registry'
import type { CategorySlug } from '@/types/story'

/**
 * Game Setup — pick a category and story count, then start.
 * Story 4.3: category grid.
 * Story 4.4: selection state + StoryCountPicker + Start button.
 * Story 4.5: Start navigates to /game/play with URL params.
 */
export default function GameSetupPage() {
  const [selectedSlug, setSelectedSlug] = useState<CategorySlug | null>(null)
  const [storyCount, setStoryCount] = useState(5)

  return (
    <AppShell>
      <PageHeader
        title="Set up your session"
        subtitle="Choose a category and how many stories you want to read."
      />

      {/* ── Step 1: Category grid ─────────────────────────────────────── */}
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

      {/* ── Step 2: Story count — only shown after a category is picked ── */}
      {selectedSlug && (
        <section className="mb-8 max-w-sm">
          <p className="text-sm font-medium text-muted-foreground mb-4">
            Step 2 — How many stories?
          </p>
          <StoryCountPicker value={storyCount} onChange={setStoryCount} />
        </section>
      )}

      {/* ── Start button ─────────────────────────────────────────────── */}
      <Button
        size="lg"
        disabled={selectedSlug === null}
        onClick={() => console.log('Start:', { category: selectedSlug, count: storyCount })}
      >
        Start session
      </Button>
    </AppShell>
  )
}
