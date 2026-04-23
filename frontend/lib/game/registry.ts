import type { CategorySlug } from '@/types/story'

/** Full metadata for a single story category. */
export interface CategoryDefinition {
  slug: CategorySlug
  name: string
  /** Emoji icon used in UI cards and badges. */
  icon: string
  /** Tailwind color name used for theming (e.g. border, badge background). */
  color: string
  tagline: string
  /** Injected into the OpenAI prompt to guide story tone and content. */
  aiPromptHint: string
}

/**
 * Central registry of all 8 story categories.
 * Adding a new category = add one entry here. Nothing else changes.
 */
export const CATEGORIES: Record<CategorySlug, CategoryDefinition> = {
  'sci-fi': {
    slug: 'sci-fi',
    name: 'Sci-Fi',
    icon: '🚀',
    color: 'blue',
    tagline: 'Space, technology, and the future',
    aiPromptHint:
      'science fiction with vivid world-building, advanced technology, and space exploration. Include specific spacecraft names, character names, numerical data such as coordinates, dates, or access codes.',
  },
  'romance': {
    slug: 'romance',
    name: 'Romance',
    icon: '💌',
    color: 'rose',
    tagline: 'Love, connection, and emotion',
    aiPromptHint:
      'romantic fiction with emotional depth and chemistry between characters. Include full character names, specific locations where they meet, meaningful objects, and at least one line of dialogue.',
  },
  'modern-life': {
    slug: 'modern-life',
    name: 'Modern Life',
    icon: '🏙️',
    color: 'slate',
    tagline: 'Everyday stories from contemporary life',
    aiPromptHint:
      'contemporary literary fiction about everyday adult life. Include realistic character names, urban or suburban settings, and specific details like street names, prices, times, or phone numbers.',
  },
  'young-modern-life': {
    slug: 'young-modern-life',
    name: 'Young & Modern',
    icon: '✨',
    color: 'purple',
    tagline: 'Life through younger eyes',
    aiPromptHint:
      'contemporary fiction from the perspective of young adults aged 18–28. Include social dynamics, modern cultural references, specific names, and relatable life moments with concrete details.',
  },
  'adventure': {
    slug: 'adventure',
    name: 'Adventure',
    icon: '🧭',
    color: 'amber',
    tagline: 'Action, exploration, and the unknown',
    aiPromptHint:
      'adventure fiction with high stakes and physical action. Include location names, character names, specific equipment or items carried, distances, elevations, or travel times.',
  },
  'travel': {
    slug: 'travel',
    name: 'Travel',
    icon: '🌍',
    color: 'teal',
    tagline: 'Places, people, and new horizons',
    aiPromptHint:
      'travel narrative fiction set in real or vividly imagined places. Include place names, local foods, cultural details, names of people encountered, and names of hotels, landmarks, or streets.',
  },
  'mystery': {
    slug: 'mystery',
    name: 'Mystery',
    icon: '🔍',
    color: 'zinc',
    tagline: 'Puzzles, clues, and hidden truths',
    aiPromptHint:
      'mystery or thriller fiction with a tense, atmospheric tone. Include detective or protagonist names, crime scene specifics, clues involving numbers, colors, times, or locations, and at least two witness or suspect names.',
  },
  'fantasy': {
    slug: 'fantasy',
    name: 'Fantasy',
    icon: '🧙',
    color: 'indigo',
    tagline: 'Magic, myth, and other worlds',
    aiPromptHint:
      'fantasy fiction with rich world-building. Include character names, place names, magical item names, specific rules or costs of magic, and numerical details such as distances, ages, or spell counts.',
  },
}

/** Ordered list of all category slugs. */
export const CATEGORY_SLUGS = Object.keys(CATEGORIES) as CategorySlug[]
