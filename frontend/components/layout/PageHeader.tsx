import { cn } from '@/lib/utils'

interface PageHeaderProps {
  title: string
  subtitle?: string
  /** Optional action element (e.g. a button) rendered to the right of the title. */
  action?: React.ReactNode
  className?: string
}

/**
 * Consistent page title + subtitle pattern used at the top of AppShell pages.
 *
 * Usage:
 * ```tsx
 * <PageHeader
 *   title="Your Reading History"
 *   subtitle="Track how your memory improves over time"
 *   action={<Button>Start Session</Button>}
 * />
 * ```
 */
export function PageHeader({ title, subtitle, action, className }: PageHeaderProps) {
  return (
    <div className={cn('flex items-start justify-between gap-4 mb-8', className)}>
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        {subtitle && (
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}
