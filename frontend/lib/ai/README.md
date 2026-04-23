# lib/ai/ — OpenAI Story & Question Generation

Server-side only. These functions are called by the Vercel Cron job (`/api/cron/generate-stories`) at 4AM daily. Never called from client components.

## Files

### generateStories.ts
```ts
generateStories(
  category: CategorySlug,
  date: string,           // 'YYYY-MM-DD'
  count: number           // default 15
): Promise<Story[]>
```

Calls GPT-4o with a structured prompt requesting:
- `count` short stories (2–4 paragraphs each)
- Matching the category tone and themes
- Rich with specific memorable details (names, locations, numbers, colors) — these become question fodder
- Stories don't need to conclude (can be continued in future batches)
- Each story returned as a structured JSON object

### generateQuestions.ts
```ts
generateQuestions(story: Story): Promise<Question[]>
```

Calls GPT-4o with the story content and requests:
- 6–8 questions of mixed types (type-in, multi-choice, multi-select)
- At least one MemoryPrompt question (pre-story "remember X" instruction)
- Specific, verifiable answers (not opinions or interpretations)
- Hard multi-choice distractors (plausible wrong answers, not obvious)
- One "Not applicable" choice always included in choice questions
- JSON structured output matching the `Question` type

## Prompt Strategy
See `docs/GAME_LOOP.md` for the full prompt templates.

## Environment Variables Required
```
OPENAI_API_KEY=sk-...
```

## Cost Estimate
- 8 categories × 15 stories × 2 calls (story + questions) = 240 API calls/day
- At ~500 tokens/story + ~400 tokens/questions ≈ ~216,000 tokens/day
- At GPT-4o pricing: ~$0.65/day at current rates (April 2026)
