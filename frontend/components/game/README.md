# components/game/ — Game Components

All components used during or immediately around a game session. These are the most complex components in the app.

## Component Roles

### Setup Phase
| Component | Route | Purpose |
|-----------|-------|---------|
| `CategoryCard.tsx` | `/game/setup` | Clickable card for one category (icon, name, tagline, stories-read count) |
| `StoryCountPicker.tsx` | `/game/setup` | Slider/stepper to pick 3–15 stories |

### Play Phase (used inside `app/game/play/page.tsx`)
| Component | Purpose |
|-----------|---------|
| `ReadingView.tsx` | Displays the current story. Shows one paragraph at a time. Tracks time per paragraph. Has a "Next paragraph" / "Continue" button. |
| `MemoryPrompt.tsx` | Full-screen overlay shown BEFORE a story begins. "Before you start reading, remember: [items]". User taps to dismiss and begin reading. |
| `QuestionOverlay.tsx` | Appears mid-reading at a paragraph break. Dims/blurs story behind it. Contains one of the three question sub-components. |
| `TypeInQuestion.tsx` | Question subtype: text input. User types a name, location, number, etc. |
| `MultiChoiceQuestion.tsx` | Question subtype: 7 options + "Not applicable" (8th). Single correct answer. Radio button style. |
| `MultiSelectQuestion.tsx` | Question subtype: 7 options + "Not applicable" (8th). Multiple correct answers. Checkbox style. |
| `QuestionFeedback.tsx` | Shown after an answer is submitted. ✓ or ✗, reveals correct answer, brief explanation. Timed auto-dismiss or manual continue. |
| `ReadingTimer.tsx` | Optional visible countdown timer (hidden by default, enabled in settings). |

### Results Phase
| Component | Route | Purpose |
|-----------|-------|---------|
| `SessionResults.tsx` | `/game/results` | Full results breakdown: score ring, accuracy by delay, WPM, question-by-question review |

## Data Flow (Play Phase)
```
useGameSession (hook)
  ├── current story + paragraph index
  ├── scheduled questions for this paragraph
  └── session metrics accumulator

ReadingView ← receives story + paragraphIndex + onParagraphComplete
QuestionOverlay ← receives scheduledQuestion + onAnswer
QuestionFeedback ← receives response + correctAnswer + onContinue
```

## Key Rules
- `ReadingView` must never auto-advance paragraphs — always wait for user input
- `QuestionOverlay` must block all interaction with story text while visible
- `QuestionFeedback` always shows the correct answer, even when user was right (reinforcement)
- No component here makes API calls directly — all data flows from `useGameSession`
