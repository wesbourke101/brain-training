import { AppShell } from '@/components/layout/AppShell'
import { PageHeader } from '@/components/layout/PageHeader'
import { ApiStatus } from '@/components/dashboard/ApiStatus'

/**
 * Dashboard — home page.
 * Full implementation comes in Epic 4 (Game Setup Flow).
 * For now: confirms AppShell renders, nav works, layout is correct,
 * and the backend health check is wired up (Epic A).
 */
export default function DashboardPage() {
  return (
    <AppShell>
      <PageHeader
        title="Good morning 👋"
        subtitle="Ready to train your memory? Pick up where you left off or start something new."
        action={<ApiStatus />}
      />

      {/* ── Placeholder content — replaced in Epic 4 ─────────────────── */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {['Sci-Fi', 'Mystery', 'Romance', 'Adventure', 'Travel', 'Fantasy', 'Modern Life', 'Young & Modern'].map(
          (category) => (
            <div
              key={category}
              className="rounded-xl border border-border bg-card p-6 flex flex-col gap-2"
            >
              <div className="text-2xl">📖</div>
              <p className="font-medium text-sm">{category}</p>
              <p className="text-xs text-muted-foreground">Coming in Epic 4</p>
            </div>
          )
        )}
      </div>
    </AppShell>
  )
}
