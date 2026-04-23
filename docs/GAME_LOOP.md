# Game Loop — Reading Memory Game

## Overview

The core mechanic is **delayed recall under proactive interference**. Users read multiple short stories and answer questions about earlier stories while reading later ones. New content actively competes with memory of previous content — this is the working memory training load.

---

## Session Setup

1. User opens `/game/setup`
2. User picks one of 8 categories (sci-fi, romance, modern-life, young-modern-life, adventure, travel, mystery, fantasy)
3. User picks story count: 3 (minimum) to 15 (maximum)
4. Session begins → redirect to `/game/play`

---

## Story Structure

Each story:
- 2–4 paragraphs long
- Does not need to conclude (ongoing narrative threads)
- Contains specific memorable details: character names, locations, phone numbers, colors, quotes, times
- These details are what the AI generates questions about

---

## The Question Schedule

Built once at session start from all stories + their questions.

```
STORY 1
  Before reading:   MemoryPrompt — "Before you start, remember: [X] and [Y]"
  During reading:   1 mid-story question (after paragraph 2 or 3)
  After story ends: Auto-advance (no pause screen)

STORY 2
  During reading:   4–5 questions about Story 1
                    Distributed evenly across paragraphs (never on paragraph 0)
  After story ends: Auto-advance

STORY 3
  During reading:   1–2 questions about Story 1
                    2–3 questions about Story 2
  After story ends: Auto-advance

STORY N (4+)
  During reading:   1–2 questions about Story N-2
                    2–3 questions about Story N-1
  After story ends: Auto-advance

AFTER FINAL STORY
  Results screen:   All remaining questions about the last story
                    (last story questions are never asked mid-stream)
```

**Key constraint:** Questions about the LAST story are always asked on the results screen, not during any story. This is because there's no subsequent story to interleave them into.

---

## MemoryPrompt

A special question type shown BEFORE the story begins (not during reading).

Example:
> "Before you start reading, pay attention to:
> - The name of the detective
> - The four-digit code on the door"

The user taps "Got it, start reading" to begin.

At some point during reading (or during the next story), a corresponding question will test these items.

---

## Question Types

### type-in
User types a free-text answer.
- Accepts: names, locations, numbers, colors, single words, short phrases
- Validation: case-insensitive exact match OR contains match (e.g., "Detective Sarah" matches "sarah")
- Never requires spelling-perfect answers — trim, lowercase, partial match

### multi-choice
User picks ONE correct answer from 8 options (7 + "Not applicable").
- Distractors must be plausible — drawn from the same story or similar-sounding alternatives
- "Not applicable" is always the 8th option
- Never make the correct answer obvious by its position or phrasing

### multi-select
User picks ALL correct answers from 8 options (7 + "Not applicable").
- Used for set-recall questions: "Which of these characters were in the scene?"
- "Not applicable" is always the 8th option and is never a correct answer (it's a bail-out)
- Grading: requires ALL correct options selected AND no incorrect options selected

---

## Feedback After Every Question

After submitting an answer, `QuestionFeedback` is always shown:
- ✓ or ✗
- The correct answer (even if user was right — reinforcement)
- Brief note on what the question was testing ("This was from Story 1, paragraph 2")
- "Continue reading" button

Auto-dismiss is optional (configurable). By default, user must tap to continue.

---

## Timing

### Reading Timer
- Always running (internal), measuring time per paragraph
- Hidden from user by default
- Can be shown in `/settings` → "Show reading timer"
- Optional constrained mode: user must advance before time runs out (competitive mode)

### Reaction Time
- For questions, reaction time is measured from when the question appears to when the user submits
- Used in metrics — fast wrong answers indicate impulsive guessing

---

## End of Session

After the last story + last question:
- Redirect to `/game/results`
- Pass session data via `localStorage` or URL state (no API call required in v1)
- Results page computes metrics client-side from the session data

---

## AI Prompt Guidelines (for generateStories + generateQuestions)

### Story prompt requirements:
- Tone matches category (sci-fi = speculative/technical, romance = emotional, mystery = tense/atmospheric, etc.)
- At least 4 named entities per story (characters, places, objects)
- At least 2 numbers or codes (phone numbers, door codes, dates, prices)
- At least 1 direct quote from a character
- Stories should feel self-contained within 2–4 paragraphs even if they don't conclude

### Question prompt requirements:
- 6–8 questions per story
- Mix of types: at least 1 type-in, 1 multi-choice, 1 multi-select, 1 MemoryPrompt
- MemoryPrompt must target details from the first or second paragraph
- Distractors for multi-choice must be from the same story's world (same name pool, same setting)
- All questions must have unambiguous, verifiable correct answers
- Never ask for opinions or interpretations
