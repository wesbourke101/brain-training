# BrainTraining — Master Project Index

> **This file is the single source of context for both human and AI.**
> Update it at the end of every epic and every significant story.
> It contains: what the project is, every file that exists, and a one-line description of each.

---

## What This Project Is

A reading-based working memory training game. Users read short AI-generated stories and answer questions about earlier stories while reading later ones. The cognitive load comes from new story content actively interfering with memory of previous stories (delayed recall under proactive interference).

**Stack:** Next.js (App Router, TypeScript) · Tailwind CSS · shadcn/ui · OpenAI GPT-4o · PostgreSQL on Neon (deferred) · Vercel

---

## Epic Progress

| Epic | Title | Status |
|------|-------|--------|
| 1 | Project Scaffold | ✅ Complete |
| 2 | Types, Registry & Game Engine | ✅ Complete |
| 3 | UI Foundation | 🔲 Not started |
| 4 | Game Setup Flow | 🔲 Not started |
| 5 | Reading & Question UI | 🔲 Not started |
| 6 | Story Library | 🔲 Not started |
| 7 | History & Settings | 🔲 Not started |
| 8 | AI Story Generation | 🔲 Not started |
| 9 | Database Integration | 🔲 Not started |
| 10 | Auth & User Accounts | 🔲 Not started |
| 11 | Polish & Launch | 🔲 Not started |

---

## Full File Tree

```
BrainTraining/                          ← repo root
│
├── PROJECT.md                          ← YOU ARE HERE. Master context file, updated each epic.
│
├── docs/                               ← Project-level documentation
│   ├── ARCHITECTURE.md                 ← Stack, data flow, DB schema, deployment plan
│   ├── EPICS.md                        ← All 11 epics with story checklists
│   ├── GAME_LOOP.md                    ← Full game mechanic spec, question scheduling rules, AI prompt guidelines
│   └── METRICS.md                      ← Every metric we track, when captured, why it matters, console.log format
│
├── frontend/                           ← Next.js application (the main codebase)
│   │
│   ├── README.md                       ← Frontend overview, setup, key design decisions
│   ├── package.json                    ← Dependencies: next, react, tailwind, lucide-react, openai
│   ├── tsconfig.json                   ← TypeScript config with @/* import alias
│   ├── next.config.ts                  ← Next.js config
│   ├── postcss.config.mjs              ← Tailwind CSS processing
│   │
│   ├── app/                            ← Next.js App Router (every folder = a URL route)
│   │   ├── README.md                   ← Route map, layout hierarchy, conventions
│   │   ├── layout.tsx                  ← Root layout: fonts, providers, global metadata [SCAFFOLD ONLY]
│   │   ├── page.tsx                    ← Dashboard: stats bar, start CTA, recent sessions [SCAFFOLD ONLY]
│   │   ├── globals.css                 ← Global CSS + Tailwind directives
│   │   │
│   │   ├── game/
│   │   │   ├── setup/
│   │   │   │   └── page.tsx            ← Category picker + story count (3–15) [TO BUILD - Epic 4]
│   │   │   ├── play/
│   │   │   │   └── page.tsx            ← THE GAME: reading + question overlays [TO BUILD - Epic 5]
│   │   │   └── results/
│   │   │       └── page.tsx            ← Post-session score, accuracy, WPM [TO BUILD - Epic 5]
│   │   │
│   │   ├── stories/
│   │   │   ├── page.tsx                ← Story library grid, filter by category [TO BUILD - Epic 6]
│   │   │   └── [id]/
│   │   │       └── page.tsx            ← Single story reader (no game mechanics) [TO BUILD - Epic 6]
│   │   │
│   │   ├── history/
│   │   │   └── page.tsx                ← Past sessions + performance trends [TO BUILD - Epic 7]
│   │   │
│   │   └── settings/
│   │       └── page.tsx                ← Timer toggle, session defaults [TO BUILD - Epic 7]
│   │
│   ├── components/                     ← React components (3 tiers: ui → layout → feature)
│   │   ├── README.md                   ← Tier system, import conventions, naming rules
│   │   │
│   │   ├── ui/                         ← Tier 1: shadcn/ui primitives (stateless, no business logic)
│   │   │   └── README.md               ← How to add shadcn components, list of planned primitives
│   │   │                               ← [All shadcn components TO ADD - Epic 3]
│   │   │
│   │   ├── layout/                     ← Tier 2: page shell wrappers
│   │   │   ├── README.md               ← AppShell vs ReadingShell usage guide
│   │   │   ├── AppShell.tsx            ← Nav + content wrapper for all non-game pages [TO BUILD - Epic 3]
│   │   │   ├── ReadingShell.tsx        ← Full-screen distraction-free wrapper for /game/play [TO BUILD - Epic 3]
│   │   │   └── PageHeader.tsx          ← Reusable page title + subtitle pattern [TO BUILD - Epic 3]
│   │   │
│   │   ├── game/                       ← Tier 3: game-specific components
│   │   │   ├── README.md               ← Component roles, data flow diagram, key rules
│   │   │   ├── CategoryCard.tsx        ← Category selector card: icon, name, tagline, story count [TO BUILD - Epic 4]
│   │   │   ├── StoryCountPicker.tsx    ← Slider/stepper: pick 3–15 stories [TO BUILD - Epic 4]
│   │   │   ├── ReadingView.tsx         ← Paragraph-by-paragraph story display + timing [TO BUILD - Epic 5]
│   │   │   ├── MemoryPrompt.tsx        ← "Remember X before you start" pre-story overlay [TO BUILD - Epic 5]
│   │   │   ├── QuestionOverlay.tsx     ← Mid-reading question interrupt wrapper [TO BUILD - Epic 5]
│   │   │   ├── TypeInQuestion.tsx      ← Free-text answer input [TO BUILD - Epic 5]
│   │   │   ├── MultiChoiceQuestion.tsx ← 7 choices + not-applicable, pick 1 correct [TO BUILD - Epic 5]
│   │   │   ├── MultiSelectQuestion.tsx ← 7 choices + not-applicable, pick all correct [TO BUILD - Epic 5]
│   │   │   ├── QuestionFeedback.tsx    ← ✓/✗ + reveal correct answer + continue button [TO BUILD - Epic 5]
│   │   │   ├── SessionResults.tsx      ← Score ring, accuracy by delay, WPM breakdown [TO BUILD - Epic 5]
│   │   │   └── ReadingTimer.tsx        ← Optional visible countdown (hidden by default) [TO BUILD - Epic 5]
│   │   │
│   │   ├── stories/                    ← Library-mode components (no game mechanics)
│   │   │   ├── README.md               ← Difference from game components, isRead logic
│   │   │   ├── StoryCard.tsx           ← Story preview: category badge, title, teaser text [TO BUILD - Epic 6]
│   │   │   └── StoryReader.tsx         ← Full story viewer (all paragraphs at once) [TO BUILD - Epic 6]
│   │   │
│   │   └── dashboard/                  ← Home page widgets
│   │       ├── README.md               ← Data source (mock → real API), widget descriptions
│   │       ├── StatsBar.tsx            ← Summary: avg WPM, accuracy %, streak, total stories [TO BUILD - Epic 4]
│   │       ├── CategoryStats.tsx       ← Bar showing stories read per category [TO BUILD - Epic 4]
│   │       └── RecentSessions.tsx      ← Last 5 sessions: date, category, score [TO BUILD - Epic 4]
│   │
│   ├── lib/                            ← Framework-agnostic business logic (no React imports)
│   │   ├── README.md                   ← Subfolder guide, import patterns
│   │   │
│   │   ├── game/                       ← Core game engine
│   │   │   ├── README.md               ← Engine architecture, scheduling rules, scoring formulas
│   │   │   ├── registry.ts             ← ✅ All 8 category definitions (slug, name, icon, color, AI hint)
│   │   │   ├── questionScheduler.ts    ← ✅ Builds question schedule; getNextQuestion(); getResultsQuestions()
│   │   │   └── scoring.ts              ← ✅ calculateSessionMetrics(); calculateWpm(); gradeTypeIn/MultiChoice/MultiSelect()
│   │   │
│   │   ├── mock/                       ← Static mock data for UI development (no AI/DB needed)
│   │   │   ├── README.md               ← How to swap mock for real API, search pattern
│   │   │   ├── stories.ts              ← ✅ 16 mock stories (2 per category), getMockStoriesForSession()
│   │   │   └── questions.ts            ← ✅ Mock questions keyed by story ID, getMockQuestions()
│   │   │
│   │   ├── ai/                         ← OpenAI GPT-4o integration (server-side, Cron only)
│   │   │   ├── README.md               ← Cost estimate, environment variables, prompt strategy
│   │   │   ├── generateStories.ts      ← generateStories(category, date, count) → Story[] [TO BUILD - Epic 8]
│   │   │   └── generateQuestions.ts    ← generateQuestions(story) → Question[] [TO BUILD - Epic 8]
│   │   │
│   │   └── api/                        ← HTTP client functions (stubs until Epic 9)
│   │       ├── client.ts               ← Base fetch wrapper: base URL, error handling [TO BUILD - Epic 9]
│   │       └── stories.ts              ← getStoriesForSession(), getStoryById(), listStories() [TO BUILD - Epic 9]
│   │
│   ├── hooks/                          ← Shared React hooks
│   │   ├── README.md                   ← Hook signatures, state shapes, console.log pattern
│   │   ├── useGameSession.ts           ← ✅ Main game state machine (phase, advance, submit, feedback)
│   │   ├── useReadingTimer.ts          ← ✅ Per-paragraph timing, WPM calc, live elapsed ms
│   │   ├── useQuestionScheduler.ts     ← ✅ Memoised schedule + getNext() + getResultsScreen()
│   │   └── useLocalStorage.ts          ← ✅ Type-safe localStorage hook, SSR-safe, cross-tab sync
│   │
│   └── types/                          ← TypeScript type definitions (no runtime code)
│       ├── README.md                   ← Type reference with inline definitions
│       ├── story.ts                    ← ✅ CategorySlug, Story, Paragraph
│       ├── question.ts                 ← ✅ QuestionType, Question, Choice, ScheduledQuestion
│       ├── session.ts                  ← ✅ GameSession, SessionStory, QuestionResponse, ParagraphTiming
│       └── metrics.ts                  ← ✅ SessionMetrics (accuracy by delay/type, WPM, response time)
│
└── brain_training_tools/               ← Legacy Python CLI prototype (reference only, not maintained)
```

---

## Key Patterns to Know

### The `console.log` Pattern (Auth deferred)
Anywhere data would be saved to a database, we use:
```ts
console.log('TODO save to db:', { type: 'session_complete', ...data })
```
Search `TODO save to db` to find all save points when wiring up the real DB.

### Mock → Real API Swap
All pages and hooks currently import from `lib/mock/`. When the API is ready:
```ts
// Before
import { getMockStoriesForSession } from '@/lib/mock/stories'
// After
import { getStoriesForSession } from '@/lib/api/stories'
```
Search `lib/mock` imports to find all swap points.

### Adding a New Category
1. Add one entry to `lib/game/registry.ts`
2. Add mock stories to `lib/mock/stories.ts`
3. Add mock questions to `lib/mock/questions.ts`
4. Nothing else needs to change.

### Game State Flow
```
useGameSession (hook)
  ├── useQuestionScheduler → buildSchedule() → sorted ScheduledQuestion[]
  ├── useReadingTimer → paragraph timings → WPM
  └── phase state machine:
        loading → memory-prompt → reading → question → feedback → reading → ... → complete
```

---

## Data Shapes (Quick Reference)

```ts
Story        { id, categorySlug, title, paragraphs[], wordCount, generationDate, isContinuation, parentStoryId }
Paragraph    { index, text, wordCount }
Question     { id, storyId, questionText, questionType, correctAnswer, choices[], isMemoryPrompt, triggerAfterParagraph }
Choice       { id, text, isCorrect }
ScheduledQ   { question, aboutStoryOrder, atStoryOrder, atParagraphIndex }
GameSession  { id, userId, categorySlug, storyCount, startedAt, endedAt, stories[] }
SessionStory { storyId, storyOrder, startedAt, completedAt, readingTimeMs, paragraphTimings[], questionsAnswered[] }
QResponse    { questionId, aboutStoryOrder, askedAtStoryOrder, delay, questionType, userAnswer, isCorrect, responseTimeMs }
Metrics      { overallAccuracy, accuracyByDelay{}, accuracyByType{}, avgWpm, avgResponseTimeMs, storiesCompleted }
```

---

## Environment Variables
```
OPENAI_API_KEY=sk-...          # Required for Epic 8 (AI generation)
DATABASE_URL=postgresql://...  # Required for Epic 9 (database)
CRON_SECRET=...                # Required for Epic 8 (Vercel cron auth)
```
