'use client'

interface QuestionFeedbackProps {
  isCorrect: boolean
  /** The question that was just answered — shown as context. */
  questionText: string
  /**
   * The correct answer to reveal.
   * Pass a string for type-in / multi-choice.
   * Pass a string[] for multi-select (multiple correct answers).
   */
  correctAnswer: string | string[]
  /** What the user actually answered — shown alongside the correct answer when wrong. */
  userAnswer?: string | string[]
  onContinue: () => void
}

/**
 * Shown immediately after a question is submitted.
 * Displays a clear ✓ / ✗, reveals the correct answer, and lets the
 * user continue reading.
 */
export function QuestionFeedback({
  isCorrect,
  questionText,
  correctAnswer,
  userAnswer,
  onContinue,
}: QuestionFeedbackProps) {
  const correctList = Array.isArray(correctAnswer) ? correctAnswer : [correctAnswer]
  const userList = userAnswer
    ? Array.isArray(userAnswer) ? userAnswer : [userAnswer]
    : []

  return (
    <div className="flex flex-col gap-6 w-full">

      {/* ── Result badge ─────────────────────────────────────────────── */}
      <div className={`flex items-center gap-3 rounded-xl px-5 py-4 ${
        isCorrect
          ? 'bg-emerald-500/15 border border-emerald-500/30'
          : 'bg-rose-500/15 border border-rose-500/30'
      }`}>
        <span className="text-3xl leading-none select-none">
          {isCorrect ? '✓' : '✗'}
        </span>
        <div>
          <p className={`font-semibold text-sm ${isCorrect ? 'text-emerald-300' : 'text-rose-300'}`}>
            {isCorrect ? 'Correct!' : 'Not quite'}
          </p>
          <p className="text-xs text-zinc-400 mt-0.5 leading-snug line-clamp-2">
            {questionText}
          </p>
        </div>
      </div>

      {/* ── Answer reveal ────────────────────────────────────────────── */}
      <div className="flex flex-col gap-3">

        {/* Correct answer */}
        <div className="rounded-xl border border-zinc-700 bg-zinc-800/60 px-4 py-3">
          <p className="text-xs font-medium uppercase tracking-widest text-zinc-500 mb-1.5">
            Correct answer
          </p>
          <div className="flex flex-col gap-1">
            {correctList.map((ans) => (
              <p key={ans} className="text-sm font-medium text-emerald-300">
                {ans}
              </p>
            ))}
          </div>
        </div>

        {/* User's answer — only shown when wrong */}
        {!isCorrect && userList.length > 0 && (
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 px-4 py-3">
            <p className="text-xs font-medium uppercase tracking-widest text-zinc-500 mb-1.5">
              Your answer
            </p>
            <div className="flex flex-col gap-1">
              {userList.map((ans) => (
                <p key={ans} className="text-sm text-rose-400">
                  {ans}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Continue button ──────────────────────────────────────────── */}
      <button
        onClick={onContinue}
        autoFocus
        className="w-full rounded-lg px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 hover:from-violet-500 hover:via-purple-500 hover:to-fuchsia-500 active:scale-[0.98] transition-all shadow-lg shadow-purple-900/40"
      >
        Continue reading →
      </button>
    </div>
  )
}
