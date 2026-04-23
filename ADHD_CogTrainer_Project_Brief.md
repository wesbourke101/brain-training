# ADHD Cognitive Trainer — Project Brief

## Overview

A cognitive training app for adults with ADHD that strengthens areas of known weakness using exercises grounded in peer-reviewed research. The app targets core cognitive deficits associated with ADHD — working memory, response inhibition, selective attention, and interference control — through well-studied laboratory task paradigms that have been repurposed as training exercises.

**Important context:** Professional ADHD treatment guidelines (AAP, SDBP, SCCAP) classify cognitive training as "experimental" or "possibly efficacious." The strongest evidence supports near-transfer effects (improvement on the trained task). Far-transfer to daily life functioning is more mixed. This app is a supplementary training tool, not a clinical treatment. It should never be marketed as a replacement for behavioral therapy or medication.

---

## Core Exercises (4 Tasks)

### 1. N-Back Task
- **Primary target:** Visuospatial working memory
- **Secondary target:** Inhibitory control (suppressing responses to lure items)
- **How it works:** The user sees a sequence of items (letters, shapes, positions) and must identify when the current item matches the one from *n* steps ago. Difficulty scales by increasing *n* (1-back → 2-back → 3-back).
- **Evidence:** A randomized controlled trial (Jones et al., 2020, *Journal of Attention Disorders*) with 41 children aged 7–14 with ADHD found that n-back training transferred to a nontrained n-back task and to a measure of inhibitory control (Conners' CPT). Transfer effects correlated with the magnitude of training gains.
- **Design notes:** N-back can be frustrating for ADHD users. Session length and gamification are critical. Consider visual/spatial variants (grid positions) over purely auditory to keep engagement high.

### 2. Digit Span (Forward / Backward / Sequencing)
- **Primary target:** Verbal working memory
- **Secondary target:** Mental manipulation (backward and sequencing modes)
- **How it works:** The user hears or sees a sequence of digits and must reproduce them. Forward mode tests raw storage capacity. Backward mode requires reversing the sequence. Sequencing mode requires reordering from lowest to highest. Sequence length increases with performance.
- **Evidence:** Digit span is a recognized cognitive training mechanism in the ADHD literature (identified in a 2025 Frontiers in Psychiatry systematic review of 22 ADHD games across 37 studies). It maps to the phonological loop component of Baddeley's working memory model, complementing the visuospatial training from n-back.
- **Design notes:** Raw digit span is inherently boring. Needs the most creative gamification of all four tasks. Consider narrative wrapping (e.g., "remembering a code sequence" or "unlocking a vault") to add context and motivation.

### 3. Go/No-Go Task
- **Primary target:** Response inhibition (impulse control)
- **Secondary target:** Sustained attention
- **How it works:** Stimuli appear one at a time. The user taps/clicks for "go" stimuli (frequent, ~80%) and must withhold their response for "no-go" stimuli (infrequent, ~20%). Speed and accuracy are tracked.
- **Evidence:** Go/No-Go is the most frequently deployed paradigm in ADHD serious games (2025 Frontiers systematic review). A 2025 study in *Scientific Reports* demonstrated that Go/No-Go training enhances inhibitory control and increases oxygenated hemoglobin levels in the left dorsolateral prefrontal cortex in children with ADHD. The N2 and P3 ERP components associated with conflict monitoring and inhibition response are well-documented as altered in ADHD populations.
- **Design notes:** This task naturally suits ADHD brains — it's fast-paced and stimulating. Keep trial intervals short (< 1 second). Use clear, distinct visual stimuli. Track both commission errors (tapping on no-go = impulsivity measure) and omission errors (missing a go = inattention measure).

### 4. Stroop Task
- **Primary target:** Interference control / selective attention
- **Secondary target:** Processing speed
- **How it works:** The user sees color words displayed in different ink colors (e.g., the word "RED" printed in blue ink). They must identify the *ink color*, not the word. The conflict between reading the word and naming the color requires active cognitive control.
- **Evidence:** A 2025 pilot study in *JMIR Human Factors* found that a gamified intervention incorporating Stroop-like elements showed significant improvements in Stroop word (p=.004), color (p<.001), and color-word (p<.001) scores in children with ADHD, with moderate effect sizes (d=-0.45), irrespective of medication status. Children with ADHD show documented impairments on the Stroop task (Reeve & Schandler, 2001).
- **Design notes:** The Stroop effect is intuitive — users immediately "feel" the conflict. This makes it more engaging than abstract tasks. Consider variations beyond classic color-word: directional Stroop (arrow pointing left with the word "RIGHT"), emotional Stroop, or counting Stroop to prevent habituation over time.

---

## Cognitive Domain Coverage

| Domain | Task(s) | ADHD Relevance |
|--------|---------|----------------|
| Visuospatial Working Memory | N-Back | Impaired updating and maintenance of spatial information |
| Verbal Working Memory | Digit Span | Impaired phonological storage and manipulation |
| Response Inhibition | Go/No-Go | Core deficit — inability to withhold prepotent responses |
| Interference Control | Stroop | Difficulty filtering irrelevant/competing information |

### Known Gap
**Cognitive flexibility / set-shifting** is not covered by the current four tasks. This is a significant ADHD deficit (getting "stuck" on one approach, difficulty transitioning between tasks). A future addition of a Wisconsin Card Sorting Task (WCST) variant or a task-switching paradigm would fill this gap. This is a candidate for v2.

---

## Tasks Considered But Not Included (for reference)

These were reviewed during planning and have peer-reviewed backing but were not selected for v1:

- **Flanker Task** — Selective attention and conflict monitoring. Strong evidence but overlaps with Stroop's cognitive domain.
- **Stop Signal Task** — Motor inhibition (canceling an already-initiated response). Overlaps with Go/No-Go but targets a slightly different inhibition mechanism. Good v2 candidate.
- **Continuous Performance Task (CPT)** — Sustained attention/vigilance. Well-studied but evidence for clinical utility is mixed (systematic reviews show limited diagnostic accuracy). Better as an assessment tool than a training tool.
- **Corsi Block-Tapping Task** — Visuospatial working memory. Overlaps with N-Back. Could be a v2 addition for variety.
- **Wisconsin Card Sorting Task (WCST)** — Cognitive flexibility. Strong evidence but more complex to implement. Top candidate for v2 to cover the set-shifting gap.
- **Task-Switching / Dimensional Change Card Sort** — Cognitive flexibility. Simplified WCST variant. Also a v2 candidate.

---

## Key Design Principles

### From the Research
1. **Adaptive difficulty is essential.** Training should adjust to the user's current performance level in real-time. Fixed difficulty leads to either boredom (too easy) or frustration (too hard), both of which disproportionately affect ADHD users.
2. **Sessions should be short.** ADHD brains fatigue quickly on cognitive tasks. Aim for 5–10 minute sessions per task, not 30-minute marathons.
3. **Positive reinforcement matters.** Reward progress, not just performance. ADHD users are more sensitive to reward signals, and the absence of reinforcement leads to rapid disengagement.
4. **Consistency over intensity.** The evidence supports regular practice over time (e.g., 5 days/week for 4+ weeks) rather than long occasional sessions.
5. **Performance feedback is required.** Professional guidelines specify that skill training must include performance feedback to be effective. Show users what's improving and where they stand.

### From ADHD-Specific UX Considerations
6. **Reduce friction to start.** Every tap between "opening the app" and "playing a game" is an opportunity for an ADHD user to get distracted. Minimize setup.
7. **Don't rely on intrinsic motivation alone.** Streaks, progress bars, level-ups, and visible improvement metrics help sustain engagement.
8. **Avoid punishing failure.** Commission errors and missed trials are data, not failures. Frame feedback constructively.

---

## Skill Training vs. Cognitive Training (Context)

Professional guidelines distinguish between two categories:

- **Cognitive Training (what this app does):** Exercising raw cognitive functions (working memory, inhibition, attention) through repetitive, adaptive tasks. Classified as "experimental" by SCCAP.
- **Skill Training (not in v1 scope):** Teaching practical real-world strategies — organization systems, time management techniques, planning methods — with practice and feedback. Classified as "well-established" by AAP/SDBP/SCCAP.

A future version could blend both approaches: cognitive tasks as the "gym" and skill-building modules (e.g., guided planning exercises, task-breakdown practice) as the practical side. This would create the strongest evidence-based positioning.

---

## Build Strategy

### Approach: Architecture Spike → Vertical Slices

**Do NOT build horizontally** (all frontend, then all backend, then glue together). Build vertically — each feature cuts through the full stack.

### Phase 1 — Product Spec (COMPLETE — this document)
Lock in the four exercises, define the user, define the core loop.

### Phase 2 — Architecture Spike
Stand up the project skeleton and build ONE game end-to-end:
- Scaffold the project (tech stack TBD)
- Implement Go/No-Go as the first game (simplest mechanically)
- Build the full flow: game UI → game logic → scoring → save results → display results
- This proves the architecture, defines the data model, and reveals the hard parts

### Phase 3 — Vertical Slice Stories
Each new feature is a self-contained story that works end-to-end:
- "User can play an N-Back session with adaptive difficulty and see their score"
- "User can play a Digit Span session (forward mode) and see results"
- "User can play a Stroop session and see results"
- "User can view training history and see trends over time"
- "User can configure session length before starting a game"
- "User can see a dashboard summarizing progress across all games"
- "Difficulty adapts based on rolling performance window"

### Phase 4 — Polish & Cross-Cutting Features
- Onboarding flow
- Streak tracking and motivation system
- Detailed analytics / progress visualization
- Backward and sequencing modes for Digit Span
- Stroop task variations (directional, counting)
- Settings (sound, notifications, session preferences)

---

## Tech Stack (TBD)
To be decided in next planning session. Key questions:
- Mobile-first (React Native / Flutter) vs. web-first (React/Next.js)?
- Backend: Node/Express, Python/FastAPI, or serverless?
- Database: PostgreSQL, Firebase, Supabase?
- Auth: needed for v1 or defer?
- Offline support needed?

---

## Open Questions
1. Target audience: Adults only, or adults + older teens?
2. Monetization model: Free, freemium, subscription?
3. Should we track and display cognitive domain scores (e.g., "Your inhibition score is X") or keep it game-level?
4. Do we want a baseline assessment flow before training begins?
5. Notification/reminder system for daily training consistency?
