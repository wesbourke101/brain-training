# Metrics — What We Track and Why

All metrics are captured client-side via `console.log('TODO save to db:', ...)` until the database is wired up.

---

## Reading Metrics

### Words Per Minute (WPM)
**What:** Reading speed for each paragraph and averaged per story/session.
**Formula:** `(wordCount / timeSpentMs) * 60000`
**When captured:** `useReadingTimer.endParagraph()` — every time user taps "continue"
**Why it matters:** Baseline reading speed and tracking improvement over time. Faster reading with equal or better accuracy = cognitive improvement.

### Time Per Paragraph
**What:** Milliseconds spent reading each paragraph.
**When captured:** On each paragraph advance.
**Why it matters:** Reveals where users slow down — complex content, fatigue, distraction. Granular data we can show as a heatmap eventually.

### Session Reading Time
**What:** Total time from first paragraph to last paragraph advance (excludes question response time).
**When captured:** Session complete.
**Why it matters:** Session duration tracking, fatigue patterns.

---

## Memory / Recall Metrics

### Overall Recall Accuracy
**What:** % of questions answered correctly in a session.
**Formula:** `correctAnswers / totalQuestions`
**When captured:** Session complete.
**Why it matters:** Primary performance metric. Should improve with regular training.

### Accuracy by Delay (Most Important)
**What:** Accuracy split by how many stories back the question reaches.
- Delay 1 = question about story N-1, asked during story N
- Delay 2 = question about story N-2, asked during story N
- Delay 0 = question about the last story, asked on results screen
**When captured:** Each QuestionResponse.
**Why it matters:** This is the core working memory metric. Users typically perform worse at higher delays (more interference). Tracking this shows if their resistance to interference is improving.

```
Example session result:
  Delay 0: 90% (last story, no interference)
  Delay 1: 70% (one story of interference)
  Delay 2: 45% (two stories of interference)
```

### Accuracy by Question Type
**What:** % correct split by type-in / multi-choice / multi-select.
**When captured:** Session complete.
**Why it matters:** Shows which recall format is harder for the user. Multi-select is generally hardest (requires complete set recall). Some users struggle more with free recall (type-in) than recognition (multi-choice).

### Accuracy by Content Category
**What:** What kinds of facts are hardest to remember?
- Names (character names)
- Locations (places, addresses)
- Numbers (codes, dates, prices)
- Colors / descriptions
- Quotes
**When captured:** Requires tagging questions by content category (future — needs Question.contentCategory field)
**Why it matters:** Reveals specific memory weaknesses (e.g., user struggles with numbers but not names).

---

## Response Metrics

### Question Response Time
**What:** Milliseconds from question appearing to user submitting an answer.
**When captured:** Each QuestionResponse.
**Why it matters:** Fast wrong answers = impulsive guessing (low confidence, poor encoding). Slow correct answers = effortful retrieval (still learning). Fast correct = fluent recall (well learned).

### Response Time by Delay
**What:** Response time split by delay level.
**Why it matters:** Users typically take longer to answer questions about older stories (higher interference). Tracking this shows if retrieval is becoming faster/more automatic over time.

---

## Session & Engagement Metrics

### Session Completion Rate
**What:** Did the user complete all N stories or quit early?
**When captured:** On session end (endedAt is null if quit).
**Why it matters:** Quitting mid-session is a signal of frustration or distraction. Track which story position causes most dropoff.

### Stories Read Per Category
**What:** Running count of how many stories read per category.
**When captured:** Each SessionStory completion.
**Why it matters:** Shows preferences. Surface as a visual (sci-fi: 10, mystery: 5) to celebrate progress.

### Daily Streak
**What:** Consecutive days with at least one completed session.
**When captured:** Session complete.
**Why it matters:** Consistency is the most important factor in cognitive training outcomes. Streaks are a motivational hook.

### Time of Day
**What:** Hour of day when sessions are completed.
**When captured:** Session start timestamp.
**Why it matters:** Future insight: "You remember 15% better when you train in the morning." Useful personalization.

---

## Future Metrics (Not in v1)

| Metric | What | Why |
|--------|------|-----|
| Cross-category interference | Does sci-fi content interfere more or less with mystery content? | Interesting research question |
| Story continuation recall | Do users remember continuation stories better (primed by prior context)? | Tests long-term encoding |
| Reading speed vs accuracy tradeoff | Do users read faster when they know hard questions are coming? | Anxiety/strategy effect |
| WPM trend over 30 days | Is reading speed improving? | Primary longitudinal metric |

---

## console.log Format Reference

Every metric save follows this format:
```ts
console.log('TODO save to db:', {
  type: 'paragraph_timing',     // metric type identifier
  sessionId: string,
  storyOrder: number,
  paragraphIndex: number,
  timeSpentMs: number,
  wpm: number,
})

console.log('TODO save to db:', {
  type: 'question_response',
  sessionId: string,
  questionId: string,
  questionType: QuestionType,
  aboutStoryOrder: number,
  askedAtStoryOrder: number,
  delay: number,               // askedAtStoryOrder - aboutStoryOrder
  isCorrect: boolean,
  responseTimeMs: number,
})

console.log('TODO save to db:', {
  type: 'session_complete',
  sessionId: string,
  categorySlug: CategorySlug,
  storiesCompleted: number,
  durationMs: number,
  metrics: SessionMetrics,
})
```
