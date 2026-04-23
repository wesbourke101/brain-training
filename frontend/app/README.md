# app/ — Next.js App Router Routes

All routes use the App Router. Every folder here is a URL segment.

## Route Map

```
/                       → Dashboard (stats bar, start CTA, recent sessions)
/game/setup             → Category picker + story count selector
/game/play              → THE GAME (reading view + question overlays) [client component]
/game/results           → Post-session results (score, accuracy breakdown, WPM)
/stories                → Story library (browse all stories by category/date)
/stories/[id]           → Read a single story (no game mechanics, no timer)
/history                → Past sessions + performance trends over time
/settings               → User preferences (timer mode, session defaults)
```

## Layout Hierarchy

```
app/layout.tsx           → Root: fonts, global providers, metadata
  app/page.tsx           → Dashboard (uses AppShell)
  app/game/
    app/game/setup/      → Uses AppShell
    app/game/play/       → Uses ReadingShell (full-screen, no nav)
    app/game/results/    → Uses AppShell
  app/stories/           → Uses AppShell
  app/history/           → Uses AppShell
  app/settings/          → Uses AppShell
```

## Key Conventions

- **`app/game/play/page.tsx`** must be a `'use client'` component — it manages real-time game state
- All other pages can be server components (or client if they need hooks)
- Data fetching for non-game pages: fetch in the server component, pass as props
- No `loading.tsx` or `error.tsx` files yet — add when needed

## Files in This Folder
- `layout.tsx` — root layout (wrap with providers, set font)
- `page.tsx` — dashboard page
- Each subfolder has its own `page.tsx`
