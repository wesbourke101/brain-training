import { AppShell } from '@/components/layout/AppShell'
import { PageHeader } from '@/components/layout/PageHeader'
import { ApiStatus } from '@/components/dashboard/ApiStatus'
import { GameLauncherCard } from '@/components/dashboard/GameLauncherCard'
import { BrainBackground } from '@/components/ui/BrainBackground'

export default function DashboardPage() {
  return (
    <AppShell>
      <BrainBackground />

      <div className="relative z-10">
        <PageHeader
          title="Good morning 👋"
          subtitle="Choose a game and start training your brain."
          action={<ApiStatus />}
        />

        {/* ── Game launcher grid ────────────────────────────────────────── */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <GameLauncherCard
            name="Verse Voyager"
            tagline="Reading memory trainer"
            description="Read AI-generated short stories and answer questions about earlier ones while reading new ones. Train delayed recall under real cognitive interference."
            href="/game/setup"
            badge="New"
            stats={['8 categories', '3–15 stories', 'AI generated']}
            available
          />

          {/* Placeholder tiles for future games */}
          <GameLauncherCard
            name="Number Surge"
            tagline="Working memory + maths"
            description="Hold sequences of numbers in mind while solving arithmetic. Gets harder as your span improves."
            href="#"
            stats={['Coming in 2025']}
            available={false}
          />

          <GameLauncherCard
            name="Echo Grid"
            tagline="Spatial pattern recall"
            description="Watch a pattern light up on a grid and reproduce it from memory — under time pressure."
            href="#"
            stats={['Coming in 2025']}
            available={false}
          />
        </div>
      </div>
    </AppShell>
  )
}
