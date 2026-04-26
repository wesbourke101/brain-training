# Epics — BrainTraining Reading Game

Epics are large features. Each epic is broken into user stories.
Status: [ ] Not started | [~] In progress | [x] Complete

> **Story rule:** Every story has one verifiable test step. Nothing is marked complete until the developer confirms the test passes. `npm run build` must return 0 errors at the end of each story.

---

## Epic 1 — Project Scaffold
**Goal:** Skeleton is in place. Every folder exists, every file has a home, docs explain everything. No feature code yet.

- [x] Create Next.js project
- [x] Install dependencies (lucide-react, openai)
- [x] Create all folder structure
- [x] Write README.md for every folder
- [x] Write project docs (ARCHITECTURE, GAME_LOOP, METRICS, EPICS)

---

## Epic 2 — Types, Registry & Game Engine
**Goal:** The TypeScript foundation is solid. Types are defined. Category registry is complete. Question scheduler logic works.

- [x] Define all types (story.ts, question.ts, session.ts, metrics.ts)
- [x] Build category registry (lib/game/registry.ts) with all 8 categories
- [x] Implement question scheduler (lib/game/questionScheduler.ts)
- [x] Implement scoring utilities (lib/game/scoring.ts)
- [x] Create mock data (lib/mock/stories.ts + lib/mock/questions.ts)
- [x] Implement hooks (useGameSession, useReadingTimer, useQuestionScheduler, useLocalStorage)

---

## Epic 3 — UI Foundation
**Goal:** shadcn/ui installed. Layout components built. Design tokens established. App shell renders correctly.

- [x] Install and configure shadcn/ui (Tailwind v4 compatible)
- [x] Build AppShell (sticky nav bar, logo, active-link highlighting)
- [x] Build ReadingShell (full-screen dark wrapper, quit button, no nav)
- [x] Build PageHeader component (title + subtitle + optional action slot)
- [x] Set up global styles and typography (shadcn CSS variables, Geist font)

---

## Epic A — Backend Scaffold ← NEW
**Goal:** A Node.js/Fastify server runs on port 3001. Health endpoint responds with JSON. Frontend confirms it can reach the backend.

**Stack:** Fastify + TypeScript · `tsx` (dev) · `tsc` (build) · Lives at `backend/` in repo root.

- [x] A.1 — Scaffold `backend/` with Fastify + TypeScript. Server starts and listens on port 3001.
  - **Test:** `cd backend && npm run dev` → terminal prints "Server listening at http://localhost:3001"
- [x] A.2 — Add `GET /health` route returning `{ status: 'ok', timestamp: '<ISO string>' }`
  - **Test:** `curl http://localhost:3001/health` → HTTP 200, JSON body
- [x] A.3 — Add `GET /` route returning `{ name: 'brain-training-api', version: '0.0.1' }`
  - **Test:** `curl http://localhost:3001/` → JSON body
- [x] A.4 — Configure `@fastify/cors` to allow `http://localhost:3000`
  - **Test:** In browser DevTools on localhost:3000: `fetch('http://localhost:3001/health').then(r=>r.json()).then(console.log)` — no CORS error, JSON logged
- [x] A.5 — Add `ApiStatus` badge to Dashboard (green = connected, red = disconnected)
  - **Test:** Both servers running → green "API Connected" badge visible top-right of page header. Stop backend → badge turns red on refresh.

---

## Epic 4 — Game Setup Flow
**Goal:** User can go from Dashboard → pick a category → pick story count → click Start → land on /game/play with session params in the URL.

- [ ] 4.1 — Build `CategoryCard` component (icon, name, tagline, onClick prop. No routing inside it.)
  - **Test:** Render one card on Dashboard temporarily. Navigate to `/` — icon, name, tagline visible. Click it — console.log fires.
- [ ] 4.2 — Build `StoryCountPicker` component (shadcn Slider, 3–15, live count label)
  - **Test:** Render on Dashboard temporarily. Drag slider — label updates. `npm run build` passes.
- [ ] 4.3 — Build `/game/setup` page with 8 CategoryCard grid (no picker yet)
  - **Test:** Navigate to `/game/setup` — 8 cards visible, correct icon/name from registry. No console errors.
- [ ] 4.4 — Wire `StoryCountPicker` into setup page. Selected category highlights. Start disabled until category picked.
  - **Test:** Click a category — highlights. Picker appears. Move slider. Start button activates.
- [ ] 4.5 — "Start" button navigates to `/game/play?category=<slug>&count=<n>`
  - **Test:** Pick "Sci-Fi", set count to 7, click Start. URL becomes `/game/play?category=sci-fi&count=7`.
- [ ] 4.6 — Update Dashboard: replace placeholder cards with real CategoryCard grid. Each links to setup with pre-selected category.
  - **Test:** Navigate to `/`. 8 real cards with icons. Click one → lands on `/game/setup` with that category highlighted.

---

## Epic 5 — Reading & Question UI
**Goal:** The full game loop works end-to-end with mock data. User reads stories, sees memory prompts, answers questions, gets feedback, reaches results screen.

- [ ] 5.1 — Build `MemoryPrompt` component (full-screen overlay, memory items, "Begin Reading" button)
  - **Test:** Render on `/game/play`. Overlay visible with placeholder text. Click "Begin Reading" — overlay gone.
- [ ] 5.2 — Build `ReadingView` component (one paragraph at a time, "Next →" button, `onAdvance` prop)
  - **Test:** Render with mock paragraph. Click "Next →" — `onAdvance` fires. `npm run build` passes.
- [ ] 5.3 — Build `TypeInQuestion` (text input + Submit button, `onSubmit(answer)` prop)
  - **Test:** Type an answer, click Submit — `onSubmit` fires with the typed string.
- [ ] 5.4 — Build `MultiChoiceQuestion` (7 choices + "Not applicable", radio style, exactly 1 selectable)
  - **Test:** Click one option — highlights. Click another — previous deselects. Submit fires with selected choice ID.
- [ ] 5.5 — Build `MultiSelectQuestion` (7 choices + "Not applicable", checkbox style, multiple selectable)
  - **Test:** Select 3 options. Submit fires with array of 3 IDs.
- [ ] 5.6 — Build `QuestionFeedback` (✓/✗, correct answer reveal, "Continue" button)
  - **Test:** Render with `isCorrect=false`. See ✗ and revealed answer. Click "Continue" — `onContinue` fires.
- [ ] 5.7 — Build `QuestionOverlay` wrapper (dims reading content, renders correct question type)
  - **Test:** With mock questions of each type: overlay dims content, correct component renders, feedback appears after submit.
- [ ] 5.8 — Wire `/game/play` page with `useGameSession` + `ReadingShell` + all components. Reads URL params.
  - **Test:** Navigate to `/game/play?category=sci-fi&count=3`. MemoryPrompt → Begin → paragraphs → question overlay → feedback → reading resumes → end of session.
- [ ] 5.9 — Build `/game/results` page with `SessionResults` (score ring, accuracy, WPM, "Play Again" button)
  - **Test:** Complete a session → reach `/game/results`. Score ring and metrics visible. "Play Again" → back to `/game/setup`. Check console for `TODO save to db:` logs.

---

## Epic 6 — Story Library
**Goal:** Users can browse all stories and read them outside the game.
*(Stories will be broken out same way when Epic 5 is done.)*

- [ ] Build StoryCard component
- [ ] Build StoryReader component
- [ ] Build /stories page (grid of StoryCards, filter by category)
- [ ] Build /stories/[id] page (StoryReader, link to parent if continuation)

---

## Epic 7 — History & Settings
**Goal:** Users can see past performance and configure preferences.
*(Stories broken out when Epic 6 is done.)*

- [ ] Build /history page (recent sessions, accuracy trend, WPM trend)
- [ ] Build /settings page (timer toggle, session length default)

---

## Epic 8 — AI Story Generation
**Goal:** Real stories generated by GPT-4o every morning at 4AM.

- [x] Build mock AI generation layer (generateStories + generateQuestions return hardcoded mock data, clearly marked for OpenAI swap)
- [ ] Implement generateStories.ts — real GPT-4o structured output call
- [ ] Implement generateQuestions.ts — real GPT-4o structured output call
- [ ] Build /api/cron/generate-stories API route
- [ ] Configure Vercel Cron Job (4AM daily)
- [ ] Validate output shape matches TypeScript types

---

## Epic 9 — Database Integration
**Goal:** Replace all `console.log('TODO save to db: ...')` with real PostgreSQL writes/reads.

- [ ] Set up Neon PostgreSQL instance
- [ ] Write and run schema migrations
- [ ] Implement lib/api/stories.ts (reads)
- [ ] Implement session save endpoints
- [ ] Implement metrics aggregation queries
- [ ] Swap all mock data imports for real API calls

---

## Epic 10 — Auth & User Accounts
**Goal:** Users can create accounts and their progress persists across devices.

- [ ] Set up NextAuth.js or Clerk
- [ ] Add sign-up / sign-in UI
- [ ] Associate sessions with user_id
- [ ] Dashboard shows personalized data

---

## Epic 11 — Polish & Launch
**Goal:** App feels polished and is ready for real users.

- [ ] Onboarding flow
- [ ] Streak display + streak recovery mechanic
- [ ] Performance trend charts (30-day WPM, accuracy)
- [ ] Empty states
- [ ] Error handling (API failures, network issues)
- [ ] Mobile layout review
- [ ] Vercel deployment + custom domain
