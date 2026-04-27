'use client'

import { useRouter } from 'next/navigation'

interface GameLauncherCardProps {
  name: string
  tagline: string
  description: string
  href: string
  badge?: string
  stats?: string[]
  available: boolean
}

/**
 * A single game tile on the Dashboard launcher.
 * Extensible — add more games by rendering more of these.
 */
export function GameLauncherCard({
  name,
  tagline,
  description,
  href,
  badge,
  stats = [],
  available,
}: GameLauncherCardProps) {
  const router = useRouter()

  return (
    <div
      onClick={() => available && router.push(href)}
      className={`
        group relative rounded-2xl border p-8 transition-all duration-200 select-none
        ${available
          ? 'border-violet-200 bg-white/70 backdrop-blur-sm cursor-pointer hover:border-violet-400 hover:shadow-xl hover:shadow-violet-100 hover:-translate-y-0.5'
          : 'border-zinc-200 bg-white/40 backdrop-blur-sm cursor-not-allowed opacity-60'
        }
      `}
    >
      {/* Badge */}
      {badge && (
        <span className="absolute top-4 right-4 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-3 py-0.5 text-xs font-semibold text-white">
          {badge}
        </span>
      )}

      {/* Name + tagline */}
      <div className="mb-4">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 group-hover:text-violet-700 transition-colors">
          {name}
        </h2>
        <p className="mt-0.5 text-sm font-medium text-violet-500">{tagline}</p>
      </div>

      {/* Description */}
      <p className="text-sm text-zinc-500 leading-relaxed mb-6">{description}</p>

      {/* Stats row */}
      {stats.length > 0 && (
        <div className="flex flex-wrap gap-3 mb-6">
          {stats.map((s) => (
            <span
              key={s}
              className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-0.5 text-xs text-zinc-500"
            >
              {s}
            </span>
          ))}
        </div>
      )}

      {/* CTA */}
      {available ? (
        <button className="rounded-lg px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 hover:from-violet-500 hover:via-purple-500 hover:to-fuchsia-500 shadow-lg shadow-purple-900/20 transition-all active:scale-[0.98]">
          Play now →
        </button>
      ) : (
        <span className="inline-block rounded-lg border border-zinc-200 px-5 py-2 text-sm font-medium text-zinc-400">
          Coming soon
        </span>
      )}
    </div>
  )
}
