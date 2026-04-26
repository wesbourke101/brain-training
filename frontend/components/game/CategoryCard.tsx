import { Card, CardContent } from '@/components/ui/card'
import type { CategoryDefinition } from '@/lib/game/registry'
import { cn } from '@/lib/utils'

interface CategoryCardProps {
  category: CategoryDefinition
  /** Whether this card is currently selected (highlighted). */
  selected?: boolean
  onClick: () => void
}

/**
 * Displays a single story category — icon, name, and tagline.
 * Purely presentational: no routing logic inside. The parent decides what
 * happens on click (navigate, select, etc.).
 */
export function CategoryCard({ category, selected = false, onClick }: CategoryCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'w-full text-left rounded-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        selected && 'ring-2 ring-primary'
      )}
    >
      <Card
        className={cn(
          'h-full cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground',
          selected && 'bg-accent text-accent-foreground'
        )}
      >
        <CardContent className="flex flex-col gap-2 pt-4">
          <span className="text-3xl leading-none" role="img" aria-label={category.name}>
            {category.icon}
          </span>
          <p className="font-semibold text-sm leading-tight">{category.name}</p>
          <p className="text-xs text-muted-foreground leading-snug">{category.tagline}</p>
        </CardContent>
      </Card>
    </button>
  )
}
