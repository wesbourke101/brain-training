# components/ — React Components

Three-tier structure. Build from the bottom up — use lower tiers inside higher tiers, never the reverse.

## Tiers

### Tier 1: `ui/` — Primitives
shadcn/ui base components. Stateless, highly reusable, no business logic.
Examples: Button, Card, Badge, Progress, Slider, Input

### Tier 2: `layout/` — Structural Wrappers
Page-level shell components that define the chrome (nav, padding, max-width).
- `AppShell.tsx` — standard nav + content wrapper used on all non-game pages
- `ReadingShell.tsx` — full-screen, distraction-free wrapper used only on `/game/play`

### Tier 3: Feature Components
Domain-specific components with business awareness.
- `game/` — everything used during or around the game session
- `stories/` — story library and reader components
- `dashboard/` — widgets on the home/dashboard page

## Import Alias
All components are imported via `@/components/...` (configured in tsconfig.json).

```ts
import { Button } from '@/components/ui/button'
import { AppShell } from '@/components/layout/AppShell'
import { CategoryCard } from '@/components/game/CategoryCard'
```

## Naming Conventions
- PascalCase filenames: `CategoryCard.tsx`
- One component per file (default export)
- Co-locate sub-components in the same file if they're only used by the parent
- Props interfaces named `[ComponentName]Props`
