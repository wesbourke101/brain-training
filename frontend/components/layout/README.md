# components/layout/ — Page Shell Components

Structural wrappers. Every page uses one of these as its outermost component.

## AppShell.tsx
Used by: dashboard, setup, results, stories, history, settings.

- Top navigation bar (logo + nav links)
- Max-width content container
- Standard padding

```tsx
<AppShell>
  <PageContent />
</AppShell>
```

## ReadingShell.tsx
Used by: `/game/play` ONLY.

- Full viewport height, no scrolling
- No navigation (zero distractions during reading)
- Black or very dark background
- Minimal chrome — only an exit/quit button in corner

```tsx
<ReadingShell onQuit={handleQuit}>
  <ReadingView ... />
</ReadingShell>
```

## PageHeader.tsx
Optional heading pattern used inside AppShell pages.

```tsx
<PageHeader
  title="Your Reading History"
  subtitle="Track how your memory improves over time"
/>
```

## Rules
- These components are purely structural — no game state
- ReadingShell must never show the nav bar (ADHD-friendly: reduce distractions during active tasks)
