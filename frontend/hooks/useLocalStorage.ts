'use client'

import { useState, useEffect, useCallback } from 'react'

/**
 * Type-safe localStorage hook. Returns the stored value and a setter.
 * Returns defaultValue on the server (SSR safe) and on parse errors.
 */
export function useLocalStorage<T>(
  key: string,
  defaultValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  const [stored, setStored] = useState<T>(() => {
    if (typeof window === 'undefined') return defaultValue
    try {
      const item = window.localStorage.getItem(key)
      return item !== null ? (JSON.parse(item) as T) : defaultValue
    } catch {
      return defaultValue
    }
  })

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStored(prev => {
        const next = typeof value === 'function' ? (value as (p: T) => T)(prev) : value
        try {
          window.localStorage.setItem(key, JSON.stringify(next))
        } catch {
          // Quota exceeded or private browsing — silently fail
        }
        return next
      })
    },
    [key]
  )

  // Sync across tabs
  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key !== key) return
      try {
        setStored(e.newValue !== null ? (JSON.parse(e.newValue) as T) : defaultValue)
      } catch {
        setStored(defaultValue)
      }
    }
    window.addEventListener('storage', handler)
    return () => window.removeEventListener('storage', handler)
  }, [key, defaultValue])

  return [stored, setValue]
}
