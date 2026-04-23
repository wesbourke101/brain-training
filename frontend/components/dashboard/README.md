# components/dashboard/ — Dashboard Widgets

Widgets shown on the home page (`/`). All use mock data until the database is wired up.

## Components

### StatsBar.tsx
A horizontal summary bar at the top of the dashboard.

Displays:
- Average WPM (reading speed)
- Overall recall accuracy %
- Current streak (days)
- Total stories read

### CategoryStats.tsx
Visual breakdown of how many stories the user has read per category.

Displays: horizontal bar chart or icon grid
- sci-fi: 10 stories
- romance: 5 stories
- mystery: 3 stories
- etc.

Sorted by count descending (most-read category first).

### RecentSessions.tsx
List of the last 5 game sessions.

Per session shows: date, category, stories read, score, accuracy.
Tapping a session could show a results breakdown (future).

## Data Source
All three components accept mock data props for now:

```ts
// Until DB is ready, these come from lib/mock/
import { mockSessions, mockCategoryStats } from '@/lib/mock/sessions'
```

When the database is wired, fetch in the parent server component and pass as props.
