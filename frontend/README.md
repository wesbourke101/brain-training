# BrainTraining — Reading Memory Game (Frontend)

## What This Is
A reading-based working memory training game. Users read AI-generated short stories and answer questions about earlier stories while reading later ones. The cognitive load comes from new story content actively interfering with memory of previous stories (proactive interference + delayed recall).

## Tech Stack
- **Framework:** Next.js (App Router, TypeScript)
- **Styling:** Tailwind CSS + shadcn/ui
- **Icons:** Lucide React
- **AI:** OpenAI GPT-4o (story + question generation)
- **Hosting:** Vercel

## Getting Started
```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Folder Overview
```
app/          → Next.js routes (pages + layouts)
components/   → React components (ui, layout, game, stories, dashboard)
lib/          → Business logic, AI calls, game engine, mock data
hooks/        → Shared React hooks
types/        → TypeScript interfaces and types
```

See each folder's README.md for details.

## Key Design Decisions

### Auth is deferred
No user accounts yet. All data persistence uses:
```ts
console.log('TODO save to db:', { type: '...', ...data })
```
Search for `TODO save to db` when wiring up the real database.

### Mock data first
All UI is built against `lib/mock/` data. No real AI calls needed during development.
When ready, swap `lib/mock/` usage for `lib/api/` calls.

### The game runs entirely client-side
Session state is managed in `hooks/useGameSession.ts`. The play page (`app/game/play/`) is a
client component that drives the full game loop.

## Project Docs
See `/docs` at the project root (one level up) for:
- `ARCHITECTURE.md` — full stack + data flow
- `GAME_LOOP.md` — game mechanics specification
- `METRICS.md` — what we track and why
- `EPICS.md` — development epics and stories
