'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ReadingShell } from '@/components/layout/ReadingShell'
import { MemoryPrompt } from '@/components/game/MemoryPrompt'
import { ReadingView } from '@/components/game/ReadingView'
import { TypeInQuestion } from '@/components/game/TypeInQuestion'
import { MultiChoiceQuestion } from '@/components/game/MultiChoiceQuestion'
import { MultiSelectQuestion } from '@/components/game/MultiSelectQuestion'

// ── Mock data for stories 5.1 + 5.2 ─────────────────────────────────────────
const MOCK_MEMORY_QUESTION = {
  id: 'test-memory-1',
  storyId: 'test-story-1',
  questionText: "Remember: the detective's name is Elena Marsh, and the vault code is 4-7-2.",
  questionType: 'type-in' as const,
  correctAnswer: null,
  choices: null,
  isMemoryPrompt: true,
  triggerAfterParagraph: null,
}

const MOCK_TYPE_IN_QUESTION = {
  id: 'test-typein-1',
  storyId: 'test-story-1',
  questionText: 'What was the vault code that Elena used to enter the service corridor?',
  questionType: 'type-in' as const,
  correctAnswer: '4-7-2',
  choices: null,
  isMemoryPrompt: false,
  triggerAfterParagraph: null,
}

const MOCK_MULTI_SELECT_QUESTION = {
  id: 'test-ms-1',
  storyId: 'test-story-1',
  questionText: 'Which of the following details were mentioned in the story?',
  questionType: 'multi-select' as const,
  correctAnswer: null,
  choices: [
    { id: 'a', text: 'A flickering lamp on the platform', isCorrect: true },
    { id: 'b', text: 'A delayed freight train', isCorrect: true },
    { id: 'c', text: 'A locked briefcase at the bottom of the stairs', isCorrect: true },
    { id: 'd', text: 'A security guard near the entrance', isCorrect: false },
    { id: 'e', text: 'A narrow descending staircase', isCorrect: true },
    { id: 'f', text: 'A keypad on the service corridor door', isCorrect: true },
    { id: 'g', text: 'A second detective waiting inside', isCorrect: false },
    { id: 'na', text: 'Not applicable', isCorrect: false },
  ],
  isMemoryPrompt: false,
  triggerAfterParagraph: null,
}

const MOCK_MULTI_CHOICE_QUESTION = {
  id: 'test-mc-1',
  storyId: 'test-story-1',
  questionText: 'Where did Detective Elena Marsh go after arriving at Meridian Station?',
  questionType: 'multi-choice' as const,
  correctAnswer: null,
  choices: [
    { id: 'a', text: 'The main concourse', isCorrect: false },
    { id: 'b', text: 'The service corridor', isCorrect: true },
    { id: 'c', text: 'The stationmaster\'s office', isCorrect: false },
    { id: 'd', text: 'The freight platform', isCorrect: false },
    { id: 'e', text: 'The waiting room', isCorrect: false },
    { id: 'f', text: 'The rooftop', isCorrect: false },
    { id: 'g', text: 'The underground vault', isCorrect: false },
    { id: 'na', text: 'Not applicable', isCorrect: false },
  ],
  isMemoryPrompt: false,
  triggerAfterParagraph: null,
}

const MOCK_PARAGRAPHS = [
  {
    index: 0,
    text: 'Detective Elena Marsh arrived at Meridian Station just before midnight. The platform was empty save for a single flickering lamp and the distant rumble of a delayed freight train.',
    wordCount: 32,
  },
  {
    index: 1,
    text: 'She crossed to the service corridor, punching the vault code — 4-7-2 — into the keypad. The lock disengaged with a satisfying click, revealing a narrow staircase descending into the dark.',
    wordCount: 34,
  },
  {
    index: 2,
    text: 'At the bottom of the stairs sat a single briefcase, exactly where her informant had promised. Elena knelt beside it, snapped the clasps open, and stared at what was inside.',
    wordCount: 33,
  },
]

/**
 * Game Play page — test shell for Epic 5.
 * Stories 5.1–5.7 add components here one at a time.
 * Fully wired in story 5.8.
 */
type TestPhase = 'memory-prompt' | 'reading' | 'type-in-question' | 'multi-choice-question' | 'multi-select-question'

export default function GamePlayPage() {
  const router = useRouter()
  const [phase, setPhase] = useState<TestPhase>('memory-prompt')
  const [paragraphIndex, setParagraphIndex] = useState(0)

  const currentParagraph = MOCK_PARAGRAPHS[paragraphIndex]

  const handleAdvance = () => {
    if (paragraphIndex < MOCK_PARAGRAPHS.length - 1) {
      setParagraphIndex((i) => i + 1)
    } else {
      // Cycle through question types for testing
      setPhase('type-in-question')
    }
  }

  return (
    <ReadingShell onQuit={() => router.push('/game/setup')}>

      {/* Story 5.1 — MemoryPrompt */}
      {phase === 'memory-prompt' && (
        <MemoryPrompt
          question={MOCK_MEMORY_QUESTION}
          storyTitle="The Vault at Meridian Station"
          onDismiss={() => setPhase('reading')}
        />
      )}

      {/* Story 5.2 — ReadingView */}
      {phase === 'reading' && currentParagraph && (
        <ReadingView
          paragraph={currentParagraph}
          storyOrder={1}
          storyTitle="The Vault at Meridian Station"
          totalParagraphs={MOCK_PARAGRAPHS.length}
          onAdvance={handleAdvance}
        />
      )}

      {/* Story 5.3 — TypeInQuestion */}
      {phase === 'type-in-question' && (
        <div className="w-full max-w-md mx-auto">
          <TypeInQuestion
            question={MOCK_TYPE_IN_QUESTION}
            onSubmit={(answer) => {
              console.log('TypeInQuestion submitted:', answer)
              setPhase('multi-choice-question')
            }}
          />
        </div>
      )}

      {/* Story 5.4 — MultiChoiceQuestion */}
      {phase === 'multi-choice-question' && (
        <div className="w-full max-w-md mx-auto">
          <MultiChoiceQuestion
            question={MOCK_MULTI_CHOICE_QUESTION}
            onSubmit={(choiceId) => {
              console.log('MultiChoiceQuestion submitted:', choiceId)
              setPhase('multi-select-question')
            }}
          />
        </div>
      )}

      {/* Story 5.5 — MultiSelectQuestion */}
      {phase === 'multi-select-question' && (
        <div className="w-full max-w-md mx-auto">
          <MultiSelectQuestion
            question={MOCK_MULTI_SELECT_QUESTION}
            onSubmit={(choiceIds) => {
              console.log('MultiSelectQuestion submitted:', choiceIds)
              setPhase('reading')
              setParagraphIndex(0)
            }}
          />
        </div>
      )}
    </ReadingShell>
  )
}
