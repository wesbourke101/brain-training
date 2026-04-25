// =============================================================================
// 🚧 MOCK IMPLEMENTATION — Hardcoded data, no real API calls
// =============================================================================
// This file returns mock questions from lib/mock/questions.ts.
// When you are ready to wire up OpenAI GPT-4o, replace the body of
// generateQuestions() with the TODO block below.
//
// TODO: REPLACE WITH OPENAI CALL
// ─────────────────────────────────────────────────────────────────────────────
// import OpenAI from 'openai'
//
// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
//
// const storyText = story.paragraphs.map(p => p.text).join('\n\n')
//
// const prompt = `
//   You are generating memory test questions for the following short story.
//   Story: """${storyText}"""
//
//   Generate 6–8 questions of mixed types. Requirements:
//   - At least 1 isMemoryPrompt (shown BEFORE reading as a "remember X" instruction)
//   - At least 1 type-in (free text: name, location, number, color, or quote)
//   - At least 2 multi-choice (7 plausible options + "Not applicable" as 8th, pick 1 correct)
//   - At least 1 multi-select (7 options + "Not applicable" as 8th, pick ALL correct)
//   - All answers must be unambiguous and verifiable from the story text
//   - Multi-choice distractors must be plausible (drawn from the same story world)
//   - Never ask for opinions or interpretations
//
//   Return a JSON array matching this exact shape:
//   [{
//     questionText: string,
//     questionType: 'type-in' | 'multi-choice' | 'multi-select',
//     correctAnswer: string | null,
//     choices: [{ text: string, isCorrect: boolean }] | null,
//     isMemoryPrompt: boolean,
//     triggerAfterParagraph: number | null
//   }]
// `
//
// const response = await openai.chat.completions.create({
//   model: 'gpt-4o',
//   response_format: { type: 'json_object' },
//   messages: [{ role: 'user', content: prompt }],
// })
//
// const parsed = JSON.parse(response.choices[0].message.content ?? '{}')
// return parsed.questions.map((q: RawQuestion, i: number) => ({
//   id: `${story.id}-q${i}`,
//   storyId: story.id,
//   choices: q.choices?.map((c, j) => ({ id: `c${j}`, ...c })) ?? null,
//   ...q,
// }))
// =============================================================================

import type { Story } from '@/types/story'
import type { Question } from '@/types/question'
import { getMockQuestions } from '@/lib/mock/questions'

/**
 * Generate questions for a given story.
 *
 * 🚧 Currently returns hardcoded mock questions from lib/mock/questions.ts.
 * Replace the function body with the OpenAI call in the TODO block above
 * once you have an API key and are ready to go live.
 *
 * If no mock questions exist for this story ID, returns an empty array —
 * add entries to lib/mock/questions.ts to cover more stories during development.
 *
 * @param story - The Story object to generate questions for
 */
export async function generateQuestions(story: Story): Promise<Question[]> {
  // 🚧 MOCK: returning hardcoded questions from lib/mock/questions.ts
  // Replace this entire block with the OpenAI call above when ready.
  console.log(`[MOCK] generateQuestions called — storyId: ${story.id}`)
  console.log('[MOCK] Returning hardcoded mock questions. Wire up OpenAI to get real questions.')

  const questions = getMockQuestions(story.id)

  if (questions.length === 0) {
    console.warn(`[MOCK] No mock questions found for storyId "${story.id}". Add them to lib/mock/questions.ts.`)
  }

  return questions
}
