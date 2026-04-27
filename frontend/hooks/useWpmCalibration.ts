'use client'

import { useState, useEffect } from 'react'

const STORAGE_KEY = 'brain-training-wpm'

export interface WpmCalibration {
  /** Saved WPM value, or null if not yet set. */
  wpm: number | null
  /** True once localStorage has been read (avoids SSR mismatch). */
  loaded: boolean
  /** True when loaded and no WPM has been saved yet. */
  needsCalibration: boolean
  /** Save a WPM value to localStorage. */
  saveWpm: (value: number) => void
  /** Clear the saved WPM (useful for re-testing). */
  clearWpm: () => void
}

/**
 * Manages the user's reading speed baseline.
 * Reads/writes from localStorage so it persists across sessions
 * until auth + user profiles are added in a later epic.
 */
export function useWpmCalibration(): WpmCalibration {
  const [wpm, setWpm] = useState<number | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = Number(stored)
      if (!isNaN(parsed) && parsed > 0) setWpm(parsed)
    }
    setLoaded(true)
  }, [])

  const saveWpm = (value: number) => {
    localStorage.setItem(STORAGE_KEY, String(value))
    setWpm(value)
  }

  const clearWpm = () => {
    localStorage.removeItem(STORAGE_KEY)
    setWpm(null)
  }

  return {
    wpm,
    loaded,
    needsCalibration: loaded && wpm === null,
    saveWpm,
    clearWpm,
  }
}
