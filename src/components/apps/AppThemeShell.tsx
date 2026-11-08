import Link from 'next/link'
import type { CSSProperties, ReactNode } from 'react'
import type { AppRecord } from '@/lib/apps'

interface AppThemeShellProps {
  app: AppRecord
  children: ReactNode
  backHref?: string
  backLabel?: string
}

export function AppThemeShell({
  app,
  children,
  backHref = '/app',
  backLabel = 'All apps',
}: AppThemeShellProps) {
  const style = {
    '--app-bg': app.theme.background,
    '--app-surface': app.theme.surface,
    '--app-accent': app.theme.accent,
    '--app-text': app.theme.text,
    '--app-muted': app.theme.muted,
    backgroundColor: 'var(--app-bg)',
    color: 'var(--app-text)',
  } as CSSProperties

  return (
    <div className="min-h-screen" style={style}>
      <header className="border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
          <Link
            href={backHref}
            className="text-sm font-mono hover:opacity-80 transition-opacity"
            style={{ color: 'var(--app-muted)' }}
          >
            ← {backLabel}
          </Link>
          <Link
            href={`/app/${app.slug}`}
            className="font-semibold tracking-tight"
            style={{ color: 'var(--app-text)' }}
          >
            {app.name}
          </Link>
          <Link
            href="/"
            className="text-sm font-mono hover:opacity-80 transition-opacity"
            style={{ color: 'var(--app-muted)' }}
          >
            DesigningSystems
          </Link>
        </div>
      </header>
      {children}
    </div>
  )
}
