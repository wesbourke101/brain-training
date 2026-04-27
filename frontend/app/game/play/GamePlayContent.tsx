'use client'

import { useMemo, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ReadingShell } from '@/components/layout/ReadingShell'
import { MemoryPrompt } from '@/components/game/MemoryPrompt'
import { ReadingView } from '@/components/game/ReadingView'
import { QuestionOverlay } from '@/components/game/QuestionOverlay'
import { useGameSession } from '@/hooks/useGameSession'
import { getMockStoriesForSession } from '@/lib/mock/stories'
import { getMockQuestionsByStoryId } from '@/lib/mock/questions'
import type { CategorySlug } from '@/types/story'

/**
 * Client content for /game/play.
 * Separated so useSearchParams() can live inside a <Suspense> boundary.
 *
 * Phase rendering:
 *  loading        → subtle "Preparing…" placeholder
 *  memory-prompt  → MemoryPrompt overlay
 *  reading        → ReadingView (3-tap advance)
 *  question       → ReadingView (dimmed behind) + QuestionOverlay
 *  feedback       → same as question — QuestionOverlay handles its own feedback card
 *  complete       → saves metrics to sessionStorage, navigates to /game/results
 */
export function GamePlayContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // ── Session parameters from URL ─────────────────────────────────────────
  const category = (searchParams.get('category') ?? 'sci-fi') as CategorySlug
  const count = Math.min(15, Math.max(3, Number(searchParams.get('count') ?? '3')))

  // ── Stable session data — only rebuilt when URL params change ───────────
  // Without useMemo these arrays would be recreated on every render, causing
  // the scheduler and hook callbacks to capture stale references.
  const stories = useMemo(
    () => getMockStoriesForSession(category, count),
    [category, count]
  )
  const questionsByStoryId = useMemo(
    () => getMockQuestionsByStoryId(stories.map((s) => s.id)),
    [stories]
  )

  // ── Game state machine ───────────────────────────────────────────────────
  const {
    phase,
    currentStory,
    currentParagraphIndex,
    currentStoryOrder,
    activeQuestion,
    sessionMetrics,
    dismissMemoryPrompt,
    advanceParagraph,
    submitAnswer,
    dismissFeedback,
  } = useGameSession(stories, questionsByStoryId, category)

  // ── Navigate to results when session completes ───────────────────────────
  useEffect(() => {
    if (phase === 'complete' && sessionMetrics) {
      try {
        sessionStorage.setItem('brain-training-metrics', JSON.stringify(sessionMetrics))
      } catch {
        // sessionStorage unavailable (e.g. private browsing with storage blocked)
      }
      router.push('/game/results')
    }
  }, [phase, sessionMetrics, router])

  const currentParagraph = currentStory?.paragraphs[currentParagraphIndex] ?? null

  return (
    <ReadingShell onQuit={() => router.push('/game/setup')}>

      {/* ── Loading ────────────────────────────────────────────────────────── */}
      {phase === 'loading' && (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-sm text-zinc-500 animate-pulse">Preparing your session…</p>
        </div>
      )}

      {/* ── Memory Prompt ─────────────────────────────────────────────────── */}
      {phase === 'memory-prompt' && activeQuestion && currentStory && (
        <MemoryPrompt
          question={activeQuestion.question}
          storyTitle={currentStory.title}
          onDismiss={dismissMemoryPrompt}
        />
      )}

      {/* ── Reading View ──────────────────────────────────────────────────── */}
      {/* Also rendered while question/feedback overlay is active so the
          dimmed reading content is visible behind the overlay. */}
      {(phase === 'reading' || phase === 'question' || phase === 'feedback') &&
        currentParagraph &&
        currentStory && (
          <ReadingView
            paragraph={currentParagraph}
            storyOrder={currentStoryOrder}
            storyTitle={currentStory.title}
            totalParagraphs={currentStory.paragraphs.length}
            onAdvance={advanceParagraph}
          />
        )}

      {/* ── Question Overlay ──────────────────────────────────────────────── */}
      {/* Rendered for both 'question' and 'feedback' phases.
          QuestionOverlay manages its own feedback card internally;
          dismissFeedback is called when the user clicks "Continue reading →". */}
      {(phase === 'question' || phase === 'feedback') && activeQuestion && (
        <QuestionOverlay
          question={activeQuestion.question}
          onSubmit={(answer) => submitAnswer(answer)}
          onFeedbackDismiss={dismissFeedback}
        />
      )}

      {/* ── Session complete — Story 5.9 will build /game/results ─────────── */}
      {phase === 'complete' && (
        <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center">
          <p className="text-2xl font-bold text-zinc-100">Session complete! 🎉</p>
          <p className="text-sm text-zinc-400">Results page coming in Story 5.9…</p>
          <button
            onClick={() => router.push('/game/setup')}
            className="mt-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 hover:from-violet-500 hover:via-purple-500 hover:to-fuchsia-500 transition-all"
          >
            Play again
          </button>
        </div>
      )}

    </ReadingShell>
  )
}
