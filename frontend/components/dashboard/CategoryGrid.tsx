'use client'

import { useRouter } from 'next/navigation'
import { CategoryCard } from '@/components/game/CategoryCard'
import { CATEGORIES, CATEGORY_SLUGS } from '@/lib/game/registry'

/**
 * Dashboard category grid.
 * Clicking a card navigates to /game/setup with that category pre-selected.
 */
export function CategoryGrid() {
  const router = useRouter()

  return (
    <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
      {CATEGORY_SLUGS.map((slug) => (
        <CategoryCard
          key={slug}
          category={CATEGORIES[slug]}
          onClick={() => router.push(`/game/setup?category=${slug}`)}
        />
      ))}
    </div>
  )
}
