import { AppShell } from '@/components/layout/AppShell'
import { PageHeader } from '@/components/layout/PageHeader'
import { ApiStatus } from '@/components/dashboard/ApiStatus'
import { CategoryGrid } from '@/components/dashboard/CategoryGrid'

/**
 * Dashboard — home page.
 * Epic 4.6: real category grid. Clicking a card goes to /game/setup.
 */
export default function DashboardPage() {
  return (
    <AppShell>
      <PageHeader
        title="Good morning 👋"
        subtitle="Ready to train your memory? Pick a category to start."
        action={<ApiStatus />}
      />

      <section>
        <p className="text-sm font-medium text-muted-foreground mb-4">
          Choose a category to begin
        </p>
        <CategoryGrid />
      </section>
    </AppShell>
  )
}
