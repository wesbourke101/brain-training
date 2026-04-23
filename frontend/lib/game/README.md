# lib/game/ — Game Engine

The core logic of the reading game. Pure TypeScript — no React, no HTTP calls.

## Files

### registry.ts
The single source of truth for all 8 categories.

```ts
export const CATEGORIES = { ... } as const
export type CategorySlug = keyof typeof CATEGORIES
```

Each entry has: `slug`, `name`, `icon`, `color`, `tagline`, `aiPromptHint`

Adding a new category = add one entry here. Nothing else changes.

### questionScheduler.ts
The most complex file in the game engine. Determines which questions appear at which point during the session.

**Core rule:**
- Questions about Story N are asked DURING Story N+1 (interleaved with reading)
- For Story 3+: mix in 1–2 old questions from Story N-2
- Questions about the LAST story are asked on the results screen (after the session)
- MemoryPrompts always appear BEFORE their story begins

**Key exports:**
```ts
// Build the full question schedule for a session upfront
buildSchedule(stories: Story[], questionsByStoryId: Record<string, Question[]>): ScheduledQuestion[]

// Given current state, what question should show right now?
getNextQuestion(schedule: ScheduledQuestion[], currentStoryOrder: number, currentParagraphIndex: number): ScheduledQuestion | null
```

### scoring.ts
Calculates session metrics from the raw QuestionResponse array.

```ts
calculateSessionMetrics(session: GameSession): SessionMetrics
calculateWpm(paragraphTimings: ParagraphTiming[], totalWordCount: number): number
calculateAccuracyByDelay(responses: QuestionResponse[]): Record<number, number>
calculateAccuracyByType(responses: QuestionResponse[]): Record<QuestionType, number>
```

Delay is measured in "stories back":
- delay 0 = question about current story (asked at end of same story — only on final story)
- delay 1 = question about story N-1 (asked during story N)
- delay 2 = question about story N-2 (asked during story N)
