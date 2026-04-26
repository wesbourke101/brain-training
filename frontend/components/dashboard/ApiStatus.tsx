'use client'

import { useEffect, useState } from 'react'

type Status = 'loading' | 'connected' | 'disconnected'

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001'

/**
 * Pings the backend /health endpoint and shows a connection status badge.
 * Green = connected, red = disconnected.
 */
export function ApiStatus() {
  const [status, setStatus] = useState<Status>('loading')

  useEffect(() => {
    let cancelled = false

    const check = async () => {
      try {
        const res = await fetch(`${API_URL}/health`, { signal: AbortSignal.timeout(4000) })
        if (!cancelled) {
          setStatus(res.ok ? 'connected' : 'disconnected')
        }
      } catch {
        if (!cancelled) setStatus('disconnected')
      }
    }

    check()
    return () => { cancelled = true }
  }, [])

  const label: Record<Status, string> = {
    loading: 'Checking API…',
    connected: 'API Connected',
    disconnected: 'API Disconnected',
  }

  const colour: Record<Status, string> = {
    loading: 'bg-muted text-muted-foreground',
    connected: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    disconnected: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${colour[status]}`}
      aria-live="polite"
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          status === 'connected' ? 'bg-green-500' :
          status === 'disconnected' ? 'bg-red-500' : 'bg-muted-foreground'
        }`}
      />
      {label[status]}
    </span>
  )
}
