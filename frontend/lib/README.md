# lib/ — Business Logic & Utilities

Framework-agnostic code. Nothing here should import React or Next.js.
All exports should be plain TypeScript functions and constants.

## Subfolders

### `ai/`
OpenAI GPT-4o integration. Two functions:
- `generateStories(category, date)` — produce 15 stories for a category
- `generateQuestions(story)` — produce questions for a single story

Not called during gameplay. Called by the Vercel Cron job at 4AM.

### `game/`
Core game engine. Three files:
- `registry.ts` — the 8 category definitions (slug, name, icon, color, AI prompt hint)
- `questionScheduler.ts` — determines which questions appear at which paragraph during which story
- `scoring.ts` — calculates session score, accuracy breakdowns, WPM

### `mock/`
Static mock data for UI development. Mirrors the shape of real data so components work without API calls.
- `stories.ts` — mock Story objects for all 8 categories
- `questions.ts` — mock Question arrays keyed by story ID

### `api/`
HTTP client functions. Initially stubs. When the backend is ready, fill these in.
- `client.ts` — base fetch wrapper (base URL, error handling, auth headers)
- `stories.ts` — `getStoriesForSession()`, `getStoryById()`, `listStories()`

### `storage.ts`
localStorage helpers for anonymous session management.
- `getOrCreateSessionId()` — anonymous user identifier
- `saveInProgressSession()` — crash recovery
- `getInProgressSession()` — restore after page refresh

## Import Pattern
```ts
import { CATEGORIES } from '@/lib/game/registry'
import { buildSchedule } from '@/lib/game/questionScheduler'
import { mockStories } from '@/lib/mock/stories'
```
