# components/ui/ — Design System Primitives

shadcn/ui components live here. These are generated via the shadcn CLI and then owned by us — edit freely.

## Adding a Component
```bash
npx shadcn@latest add <component-name>
# e.g.
npx shadcn@latest add button card badge progress slider input
```

## Components Planned
| Component | shadcn name | Used by |
|-----------|-------------|---------|
| Button    | `button`    | Everywhere |
| Card      | `card`      | GameCard, StoryCard, dashboard widgets |
| Badge     | `badge`     | Category labels, difficulty indicators |
| Progress  | `progress`  | Reading progress bar, score display |
| Slider    | `slider`    | StoryCountPicker (3–15 stories) |
| Input     | `input`     | TypeInQuestion answer field |

## Rules
- Do NOT add business logic here
- Do NOT import from `lib/` or `hooks/` here
- Keep components fully controlled (accept value/onChange props)
- Extend shadcn defaults with Tailwind variants, not new components
