import Link from 'next/link'
import type { RelatedLink } from '../../../related.config'

const typeStyles: Record<RelatedLink['type'], string> = {
  chapter: 'bg-brand-500/10 text-brand-600 border-brand-500/20 hover:bg-brand-500/15',
  company: 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100',
  blog: 'bg-violet-50 text-violet-600 border-violet-200 hover:bg-violet-100',
}

interface RelatedLinksBarProps {
  links: RelatedLink[]
}

export function RelatedLinksBar({ links }: RelatedLinksBarProps) {
  if (links.length === 0) return null

  return (
    <div className="shrink-0 flex items-center gap-2 px-4 py-2 border-b border-gray-100 bg-white/95 overflow-x-auto">
      <span className="text-xs font-mono text-muted shrink-0">Related</span>
      <div className="flex items-center gap-1.5 min-w-0">
        {links.map(link => (
          <Link
            key={link.href}
            href={link.href}
            className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-mono border transition-colors ${typeStyles[link.type]}`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
