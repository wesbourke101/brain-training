// =============================================================================
// 🚧 MOCK IMPLEMENTATION — Hardcoded data, no real API calls
// =============================================================================
// This file returns mock stories from lib/mock/stories.ts.
// When you are ready to wire up OpenAI GPT-4o, replace the body of
// generateStories() with the TODO block below.
//
// TODO: REPLACE WITH OPENAI CALL
// ─────────────────────────────────────────────────────────────────────────────
// import OpenAI from 'openai'
//
// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
//
// const prompt = `
//   Generate ${count} short stories in the "${category}" genre.
//   Each story must be 2–4 paragraphs. Stories do not need to conclude.
//   Include at minimum: 2 character names, 1 location, 1 number or code, 1 quote.
//   Tone guidance: ${CATEGORIES[category].aiPromptHint}
//
//   Return a JSON array matching this exact shape:
//   [{ title: string, paragraphs: [{ index: number, text: string, wordCount: number }] }]
// `
//
// const response = await openai.chat.completions.create({
//   model: 'gpt-4o',
//   response_format: { type: 'json_object' },
//   messages: [{ role: 'user', content: prompt }],
// })
//
// const parsed = JSON.parse(response.choices[0].message.content ?? '{}')
// return parsed.stories.map((s: RawStory, i: number) => ({
//   id: `${category}-${date}-${i}`,
//   categorySlug: category,
//   generationDate: date,
//   isContinuation: false,
//   parentStoryId: null,
//   wordCount: s.paragraphs.reduce((sum, p) => sum + p.wordCount, 0),
//   ...s,
// }))
// =============================================================================

import type { Story, CategorySlug } from '@/types/story'
import { getMockStoriesForSession } from '@/lib/mock/stories'

/**
 * Generate stories for a given category and date.
 *
 * 🚧 Currently returns hardcoded mock data.
 * Replace the function body with the OpenAI call in the TODO block above
 * once you have an API key and are ready to go live.
 *
 * @param category - The story category slug
 * @param date     - ISO date string 'YYYY-MM-DD' (used as the generation date)
 * @param count    - Number of stories to generate (default 15)
 */
export async function generateStories(
  category: CategorySlug,
  date: string,
  count: number = 15
): Promise<Story[]> {
  // 🚧 MOCK: returning hardcoded stories from lib/mock/stories.ts
  // Replace this entire block with the OpenAI call above when ready.
  console.log(`[MOCK] generateStories called — category: ${category}, date: ${date}, count: ${count}`)
  console.log('[MOCK] Returning hardcoded mock stories. Wire up OpenAI to get real content.')

  const stories = getMockStoriesForSession(category, Math.min(count, 15))

  // Stamp the requested date onto mock stories so downstream code sees the right date
  return stories.map(story => ({ ...story, generationDate: date }))
}
