# Architecture — BrainTraining Reading Game

## Stack Overview

| Layer | Technology | Notes |
|-------|-----------|-------|
| Frontend | Next.js (App Router, TypeScript) | Hosted on Vercel |
| Styling | Tailwind CSS + shadcn/ui | |
| Icons | Lucide React | |
| AI Generation | OpenAI GPT-4o | Server-side only |
| Database | PostgreSQL on Neon | Deferred — console.log pattern for now |
| Auth | None (v1) | Planned for v1.5 |
| Scheduled Jobs | Vercel Cron Jobs | 4AM daily story generation |

## Project Layout

```
BrainTraining/           ← repo root
├── frontend/            ← Next.js app (this is the main codebase)
├── docs/                ← Project documentation (you are here)
├── brain_training_tools/← Legacy Python CLI prototype (reference only)
└── main.py              ← Legacy CLI entry point (reference only)
```

## Data Flow

### Daily Story Generation (4AM Cron)
```
Vercel Cron
  → POST /api/cron/generate-stories
  → lib/ai/generateStories.ts   (OpenAI GPT-4o)
  → lib/ai/generateQuestions.ts (OpenAI GPT-4o)
  → console.log('TODO save to db:', stories + questions)
  [future: → PostgreSQL via Neon]
```

### Game Session (Client)
```
User opens app
  → /                          (dashboard, mock data)
  → /game/setup                (pick category + count)
  → /game/play                 (game loop, fully client-side)
      useGameSession hook
        ← lib/mock/stories     (today: mock data)
        ← lib/mock/questions   (today: mock data)
        [future: ← /api/game/session endpoint]
      → console.log('TODO save to db:', paragraph timings, responses)
  → /game/results              (score + metrics from session state)
```

### Story Library (Client + Server)
```
User opens /stories
  → server component fetches story list
  [today: lib/mock/stories]
  [future: /api/stories?category=&date=]
  → renders StoryCard grid

User opens /stories/[id]
  → server component fetches single story
  → renders StoryReader (no game mechanics)
```

## Database Schema (Future — PostgreSQL)

```sql
-- Categories (seeded, not AI-generated)
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL
);

-- Stories (AI-generated daily)
CREATE TABLE stories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES categories(id),
  title TEXT NOT NULL,
  paragraphs JSONB NOT NULL,     -- [{index, text, wordCount}]
  word_count INT NOT NULL,
  generation_date DATE NOT NULL,
  is_continuation BOOLEAN DEFAULT FALSE,
  parent_story_id UUID REFERENCES stories(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Questions (AI-generated alongside stories)
CREATE TABLE questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  story_id UUID REFERENCES stories(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  question_type TEXT NOT NULL,   -- 'type-in' | 'multi-choice' | 'multi-select'
  correct_answer TEXT,
  choices JSONB,                 -- [{id, text, isCorrect}]
  is_memory_prompt BOOLEAN DEFAULT FALSE,
  trigger_after_paragraph INT
);

-- Sessions
CREATE TABLE game_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,                  -- NULL = anonymous (v1)
  category_slug TEXT NOT NULL,
  story_count INT NOT NULL,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  ended_at TIMESTAMPTZ
);

-- Per-story data within a session
CREATE TABLE session_stories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES game_sessions(id) ON DELETE CASCADE,
  story_id UUID REFERENCES stories(id),
  story_order INT NOT NULL,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  paragraph_timings JSONB        -- [{paragraphIndex, timeSpentMs}]
);

-- Individual question responses
CREATE TABLE question_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES game_sessions(id) ON DELETE CASCADE,
  question_id UUID REFERENCES questions(id),
  about_story_order INT NOT NULL,
  asked_at_story_order INT NOT NULL,
  user_answer JSONB NOT NULL,    -- string or string[]
  is_correct BOOLEAN NOT NULL,
  response_time_ms INT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Users (ready for auth v1.5)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## Vercel Deployment

```
frontend/         → Vercel project root
vercel.json       → cron job config (to be added)
```

Environment variables needed on Vercel:
```
OPENAI_API_KEY=sk-...
DATABASE_URL=postgresql://...   (future)
CRON_SECRET=...                 (Vercel cron auth token)
```

## Auth Plan (v1.5)
- Add NextAuth.js or Clerk
- Add `user_id` to session creation
- All `console.log('TODO save to db:', ...)` calls already capture the right shape — wiring up is mechanical
