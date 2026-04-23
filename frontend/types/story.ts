/** All valid category slugs for story generation and display. */
export type CategorySlug =
  | 'sci-fi'
  | 'romance'
  | 'modern-life'
  | 'young-modern-life'
  | 'adventure'
  | 'travel'
  | 'mystery'
  | 'fantasy'

/** A single paragraph within a story, with its position and word count. */
export interface Paragraph {
  index: number
  text: string
  wordCount: number
}

/**
 * A short AI-generated story (2–4 paragraphs).
 * Stories don't need to conclude — they can be continued in future batches.
 */
export interface Story {
  id: string
  categorySlug: CategorySlug
  title: string
  paragraphs: Paragraph[]
  wordCount: number
  /** ISO date string 'YYYY-MM-DD' — which daily batch this story belongs to. */
  generationDate: string
  /** True if this story continues the narrative of another story. */
  isContinuation: boolean
  /** ID of the story this one continues, or null. */
  parentStoryId: string | null
}
