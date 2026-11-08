'use client'

import { AppThemeShell } from '@/components/apps/AppThemeShell'
import { MarkdownArticle } from '@/components/apps/MarkdownArticle'
import type { AppRecord } from '@/lib/apps'

interface PrivacyContentProps {
  app: AppRecord
  html: string
}

export function PrivacyContent({ app, html }: PrivacyContentProps) {
  return (
    <AppThemeShell app={app} backHref={`/app/${app.slug}`} backLabel={app.name}>
      <main className="max-w-3xl mx-auto px-4 pt-12 pb-20">
        <p
          className="text-sm font-mono uppercase tracking-[0.18em] mb-6"
          style={{ color: 'var(--app-accent)' }}
        >
          Legal
        </p>
        <div style={{ color: 'var(--app-text)' }}>
          <MarkdownArticle html={html} variant="dark" />
        </div>
      </main>
    </AppThemeShell>
  )
}
