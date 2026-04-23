# hooks/ — Shared React Hooks

Custom hooks that encapsulate stateful logic used across components. All hooks start with `use`.

## Hooks

### useGameSession.ts
The main game state machine. Used exclusively by `app/game/play/page.tsx`.

**State it manages:**
- Current story index
- Current paragraph index within the story
- Active question (if any)
- All paragraph timings
- All question responses
- Session start/end times

**Key methods:**
```ts
const {
  currentStory,
  currentParagraphIndex,
  activeQuestion,
  advanceParagraph,    // move to next paragraph, checks for scheduled questions
  submitAnswer,        // record a question response, show feedback
  dismissFeedback,     // hide feedback overlay, resume reading
  completeStory,       // move to next story or end session
  sessionMetrics,      // computed from all responses so far
} = useGameSession(stories, schedule)
```

**Side effects (all console.log for now):**
```ts
console.log('TODO save to db:', { type: 'paragraph_timing', ...timing })
console.log('TODO save to db:', { type: 'question_response', ...response })
console.log('TODO save to db:', { type: 'session_complete', ...session })
```

### useReadingTimer.ts
Tracks time spent on each paragraph. Used inside `useGameSession`.

```ts
const { startParagraph, endParagraph, currentElapsedMs } = useReadingTimer()
```

- `startParagraph()` — called when a paragraph becomes visible
- `endParagraph()` — called when user taps "continue", returns elapsed ms
- `currentElapsedMs` — live value for optional visible timer display

### useQuestionScheduler.ts
Thin hook wrapper around `lib/game/questionScheduler.ts`. Holds the computed schedule in state.

```ts
const { schedule, getNextQuestion } = useQuestionScheduler(stories, questionsByStoryId)
```

### useLocalStorage.ts
Type-safe localStorage read/write. Handles SSR (returns default value on server).

```ts
const [value, setValue] = useLocalStorage<T>(key: string, defaultValue: T)
```
