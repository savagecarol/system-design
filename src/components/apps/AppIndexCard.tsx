import Link from 'next/link'
import type { AppRecord } from '@/lib/apps'

interface AppIndexCardProps {
  app: AppRecord
}

function ExternalAction({
  href,
  label,
}: {
  href: string
  label: string
}) {
  if (!href) {
    return (
      <span
        className="inline-flex items-center rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-muted cursor-not-allowed"
        title="Coming soon"
      >
        {label} · Soon
      </span>
    )
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:border-brand-500 hover:text-brand-600 transition-colors"
    >
      {label}
    </a>
  )
}

export function AppIndexCard({ app }: AppIndexCardProps) {
  const base = `/app/${app.slug}`

  return (
    <article className="rounded-xl border border-gray-200 bg-white overflow-hidden hover:shadow-md transition-shadow">
      <div
        className="px-6 py-5 border-b border-gray-100"
        style={{
          background: `linear-gradient(135deg, ${app.theme.accent}18 0%, ${app.theme.background}08 100%)`,
        }}
      >
        <div className="flex items-center gap-2 flex-wrap mb-1">
          <h2 className="text-2xl font-semibold text-gray-900">{app.name}</h2>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-mono border border-gray-200 text-muted">
            {app.status === 'launched' ? 'Launched' : 'Coming soon'}
          </span>
        </div>
        <p className="text-sm text-muted">{app.tagline}</p>
      </div>

      <div className="px-6 py-4 flex flex-wrap gap-2">
        <Link
          href={base}
          className="inline-flex items-center rounded-lg bg-brand-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-brand-700 transition-colors"
        >
          Home
        </Link>
        <Link
          href={`${base}/privacy`}
          className="inline-flex items-center rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:border-brand-500 hover:text-brand-600 transition-colors"
        >
          Privacy
        </Link>
        <Link
          href={`${base}/instructions`}
          className="inline-flex items-center rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:border-brand-500 hover:text-brand-600 transition-colors"
        >
          Instructions
        </Link>
        <ExternalAction href={app.githubUrl} label="GitHub" />
        <ExternalAction href={app.playStoreUrl} label="Play Store" />
      </div>
    </article>
  )
}
