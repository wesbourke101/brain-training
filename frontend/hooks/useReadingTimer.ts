'use client'

import { useRef, useState, useCallback } from 'react'
import type { ParagraphTiming } from '@/types/session'

interface UseReadingTimerReturn {
  /** Call when a paragraph becomes visible to the user. */
  startParagraph: (paragraphIndex: number) => void
  /**
   * Call when the user taps "continue". Returns the elapsed time in ms
   * and records the timing internally.
   */
  endParagraph: () => ParagraphTiming | null
  /** Live elapsed ms since startParagraph was called. Updates every 100ms. */
  currentElapsedMs: number
  /** All completed paragraph timings recorded so far. */
  timings: ParagraphTiming[]
  /** Clear all timings (call at story start). */
  reset: () => void
}

/**
 * Tracks how long the user spends on each paragraph.
 * Used inside useGameSession for per-paragraph reading speed measurement.
 */
export function useReadingTimer(): UseReadingTimerReturn {
  const startTimeRef = useRef<number | null>(null)
  const currentParagraphRef = useRef<number | null>(null)
  const [timings, setTimings] = useState<ParagraphTiming[]>([])
  const [currentElapsedMs, setCurrentElapsedMs] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const startParagraph = useCallback((paragraphIndex: number) => {
    // Clear any running interval
    if (intervalRef.current) clearInterval(intervalRef.current)

    startTimeRef.current = Date.now()
    currentParagraphRef.current = paragraphIndex
    setCurrentElapsedMs(0)

    // Tick every 100ms for live display
    intervalRef.current = setInterval(() => {
      if (startTimeRef.current !== null) {
        setCurrentElapsedMs(Date.now() - startTimeRef.current)
      }
    }, 100)
  }, [])

  const endParagraph = useCallback((): ParagraphTiming | null => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (startTimeRef.current === null || currentParagraphRef.current === null) return null

    const timeSpentMs = Date.now() - startTimeRef.current
    const timing: ParagraphTiming = {
      paragraphIndex: currentParagraphRef.current,
      timeSpentMs,
    }

    setTimings(prev => [...prev, timing])
    startTimeRef.current = null
    currentParagraphRef.current = null
    setCurrentElapsedMs(0)

    console.log('TODO save to db:', { type: 'paragraph_timing', ...timing })

    return timing
  }, [])

  const reset = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    startTimeRef.current = null
    currentParagraphRef.current = null
    setTimings([])
    setCurrentElapsedMs(0)
  }, [])

  return { startParagraph, endParagraph, currentElapsedMs, timings, reset }
}
