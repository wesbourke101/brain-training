# types/ — TypeScript Type Definitions

All shared interfaces and types. No runtime code — types only.

## Files

### story.ts
Core story and category types.

```ts
type CategorySlug = 'sci-fi' | 'romance' | 'modern-life' | 'young-modern-life' | 'adventure' | 'travel' | 'mystery' | 'fantasy'

interface Story {
  id: string
  categorySlug: CategorySlug
  title: string
  paragraphs: Paragraph[]
  wordCount: number
  generationDate: string      // 'YYYY-MM-DD'
  isContinuation: boolean
  parentStoryId: string | null
}

interface Paragraph {
  index: number
  text: string
  wordCount: number
}
```

### question.ts
Question types and the scheduled question shape.

```ts
type QuestionType = 'type-in' | 'multi-choice' | 'multi-select'

interface Question {
  id: string
  storyId: string
  questionText: string
  questionType: QuestionType
  correctAnswer: string | null    // for type-in
  choices: Choice[] | null        // for multi-choice / multi-select
  isMemoryPrompt: boolean         // shown before story begins
  triggerAfterParagraph: number | null
}

interface Choice {
  id: string
  text: string
  isCorrect: boolean
}

interface ScheduledQuestion {
  question: Question
  aboutStoryOrder: number    // 1-based: which story this is about
  atStoryOrder: number       // 1-based: which story the user is reading when asked
  atParagraphIndex: number   // show after this paragraph
}
```

### session.ts
Session and response tracking types.

```ts
interface GameSession {
  id: string
  categorySlug: CategorySlug
  storyCount: number
  startedAt: string
  endedAt: string | null
  stories: SessionStory[]
}

interface SessionStory {
  storyId: string
  storyOrder: number
  startedAt: string
  completedAt: string | null
  readingTimeMs: number
  paragraphTimings: ParagraphTiming[]
  questionsAnswered: QuestionResponse[]
}

interface ParagraphTiming {
  paragraphIndex: number
  timeSpentMs: number
}

interface QuestionResponse {
  questionId: string
  aboutStoryOrder: number
  askedAtStoryOrder: number
  userAnswer: string | string[]
  isCorrect: boolean
  responseTimeMs: number
}
```

### metrics.ts
Computed metrics after a session.

```ts
interface SessionMetrics {
  overallAccuracy: number                       // 0–1
  accuracyByDelay: Record<number, number>       // {1: 0.8, 2: 0.6}
  accuracyByType: Record<QuestionType, number>  // {'type-in': 0.7, ...}
  avgWpm: number
  avgResponseTimeMs: number
  storiesCompleted: number
}
```
