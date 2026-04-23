# lib/mock/ — Mock Data for UI Development

Static data that mirrors the shape of real AI-generated stories and questions. Use this during development so the UI works without making OpenAI API calls or hitting a database.

## Files

### stories.ts
Exports mock Story objects across multiple categories.

```ts
export const mockStories: Story[] = [...]
export const mockStoriesByCategory: Record<CategorySlug, Story[]> = {...}

// Helper: get N mock stories for a session
export function getMockStoriesForSession(category: CategorySlug, count: number): Story[]
```

Each mock story has 3–4 paragraphs with real-ish content — enough to make the UI feel genuine during development.

### questions.ts
Exports mock Question arrays keyed by story ID.

```ts
export const mockQuestions: Record<string, Question[]> = {
  'mock-story-1': [...],
  'mock-story-2': [...],
}

// Helper: get questions for a story
export function getMockQuestions(storyId: string): Question[]
```

Each story has a mix of question types: at least one type-in, one multi-choice, one multi-select, and one MemoryPrompt.

## Switching to Real Data
When the API is ready, replace mock usage in page/hook files:

```ts
// Before (mock)
import { getMockStoriesForSession } from '@/lib/mock/stories'
const stories = getMockStoriesForSession(category, count)

// After (real)
import { getStoriesForSession } from '@/lib/api/stories'
const stories = await getStoriesForSession(category, count, date)
```

Search codebase for `lib/mock` imports to find all swap points.
