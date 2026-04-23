# components/stories/ — Story Library Components

Used in the story library (`/stories`) and individual story reader (`/stories/[id]`). These are the "outside the game" reading components — no timers, no questions, no pressure.

## Components

### StoryCard.tsx
Used in the story grid on `/stories`.

Props:
- `story: Story` — the story to preview
- `onClick: () => void` — navigate to full reader
- `isRead?: boolean` — show a subtle "read" indicator

Displays: category badge, title, date generated, first ~50 words as a teaser, word count estimate.

### StoryReader.tsx
Used on `/stories/[id]` — full story reading experience without game mechanics.

Props:
- `story: Story`

Features:
- Shows all paragraphs at once (no paragraph-gating — this is leisure reading)
- Category badge and title at top
- If story is a continuation, shows a link to the parent story
- "Play this story in a game" CTA at bottom

## Notes
- These components intentionally have NO timing, NO question overlays
- They exist so users can read past stories for context before a game session
- The `isRead` indicator comes from localStorage (sessions where this story appeared)
