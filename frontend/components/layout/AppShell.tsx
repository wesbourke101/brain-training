'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BookOpen, LayoutDashboard, History, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { href: '/',         label: 'Dashboard', icon: LayoutDashboard },
  { href: '/stories',  label: 'Stories',   icon: BookOpen        },
  { href: '/history',  label: 'History',   icon: History         },
  { href: '/settings', label: 'Settings',  icon: Settings        },
]

interface AppShellProps {
  children: React.ReactNode
}

/**
 * Standard page wrapper used on all non-game pages.
 * Renders a top nav bar with logo and navigation links,
 * then a centred content area beneath.
 */
export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen flex flex-col">
      {/* ── Top navigation bar ───────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-base font-semibold tracking-tight hover:opacity-80 transition-opacity"
          >
            <span className="text-xl">🧠</span>
            <span>Brain Training</span>
          </Link>

          {/* Nav links */}
          <nav className="flex items-center gap-1">
            {NAV_LINKS.map(({ href, label, icon: Icon }) => {
              const isActive =
                href === '/' ? pathname === '/' : pathname.startsWith(href)
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    'flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">{label}</span>
                </Link>
              )
            })}
          </nav>
        </div>
      </header>

      {/* ── Page content ─────────────────────────────────────────────── */}
      <main className="flex-1 mx-auto w-full max-w-5xl px-4 sm:px-6 py-8">
        {children}
      </main>
    </div>
  )
}
