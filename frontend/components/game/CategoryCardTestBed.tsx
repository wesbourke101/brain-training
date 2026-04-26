'use client'

import { useState } from 'react'
import { CategoryCard } from '@/components/game/CategoryCard'
import { StoryCountPicker } from '@/components/game/StoryCountPicker'
import { CATEGORIES } from '@/lib/game/registry'

/**
 * Temporary client wrapper for Story 4.1 + 4.2 testing only.
 * Removed in Story 4.6 when the real Dashboard grid is wired up.
 */
export function CategoryCardTestBed() {
  const [count, setCount] = useState(5)

  return (
    <div className="mb-8 flex flex-col gap-6">
      {/* 4.1 — CategoryCard */}
      <div>
        <p className="text-xs text-muted-foreground mb-3 font-mono">
          [4.1 test] CategoryCard — click it and check the browser console
        </p>
        <div className="max-w-[200px]">
          <CategoryCard
            category={CATEGORIES['sci-fi']}
            onClick={() => console.log('CategoryCard clicked:', CATEGORIES['sci-fi'].slug)}
          />
        </div>
      </div>

      {/* 4.2 — StoryCountPicker */}
      <div>
        <p className="text-xs text-muted-foreground mb-3 font-mono">
          [4.2 test] StoryCountPicker — drag the slider and watch the count update
        </p>
        <div className="max-w-xs">
          <StoryCountPicker value={count} onChange={setCount} />
        </div>
      </div>
    </div>
  )
}
