frontend/
├── app/                              # Next.js App Router
│   ├── layout.tsx                    # Root layout (fonts, providers, AppShell)
│   ├── page.tsx                      # Dashboard (game picker + streak + progress)
│   ├── games/
│   │   ├── layout.tsx                # Games layout (wraps all game routes)
│   │   ├── page.tsx                  # Games overview / selection grid
│   │   ├── go-no-go/
│   │   │   ├── page.tsx              # Game info + config + start
│   │   │   ├── play/page.tsx         # [STUB] Active game screen
│   │   │   └── results/page.tsx      # Post-session results
│   │   ├── n-back/
│   │   │   ├── page.tsx
│   │   │   ├── play/page.tsx         # [STUB]
│   │   │   └── results/page.tsx
│   │   ├── digit-span/
│   │   │   ├── page.tsx
│   │   │   ├── play/page.tsx         # [STUB]
│   │   │   └── results/page.tsx
│   │   └── stroop/
│   │       ├── page.tsx
│   │       ├── play/page.tsx         # [STUB]
│   │       └── results/page.tsx
│   ├── history/
│   │   └── page.tsx                  # Training history + trend charts
│   └── settings/
│       └── page.tsx                  # Preferences (session length, etc.)
│
├── components/
│   ├── ui/                           # Primitive design system components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── Progress.tsx
│   │   └── index.ts                  # Re-exports
│   ├── layout/
│   │   ├── AppShell.tsx              # Top nav + page wrapper (used on non-game pages)
│   │   ├── GameShell.tsx             # Full-screen, distraction-free wrapper for play pages
│   │   └── PageHeader.tsx            # Page title + subtitle pattern
│   ├── games/                        # Shared game chrome (used by all 4 games)
│   │   ├── GameCard.tsx              # Dashboard card: icon, name, domain, streak
│   │   ├── GameConfig.tsx            # Pre-game config panel (difficulty, session length)
│   │   ├── GameResults.tsx           # Post-session results panel (score, breakdown, CTA)
│   │   ├── DifficultyBadge.tsx       # Visual pill: Easy / Medium / Hard
│   │   ├── ScoreRing.tsx             # Circular score display (0-100)
│   │   └── TrialFeedback.tsx         # Animated ✓/✗ shown after each trial
│   └── dashboard/
│       ├── StreakCard.tsx             # Current streak + longest streak
│       ├── RecentSessions.tsx        # Last N sessions across all games
│       └── DomainProgress.tsx        # Radar/bar showing 4 cognitive domains
│
├── lib/
│   ├── api/
│   │   ├── client.ts                 # Base fetch wrapper (sets base URL, handles errors)
│   │   ├── sessions.ts               # createSession(), getSession(), listSessions()
│   │   └── index.ts                  # Re-exports
│   ├── games/
│   │   ├── registry.ts               # Central game metadata (name, slug, domain, icon, color)
│   │   ├── scoring.ts                # Shared scoring utilities (accuracy, RT percentile)
│   │   └── adaptive.ts               # Adaptive difficulty algorithm (shared across games)
│   └── storage.ts                    # localStorage helpers for anonymous session ID
│
├── hooks/
│   ├── useGameSession.ts             # Start/end session lifecycle, posts to API
│   ├── useTimer.ts                   # Countdown timer + reaction time measurement
│   ├── useKeyPress.ts                # Keyboard input for game responses
│   └── useLocalStorage.ts            # Type-safe localStorage hook
│
└── types/
    ├── game.ts                       # GameType, Session, Trial, GameConfig, GameResult
    └── api.ts                        # API request/response shapes