'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import type { Chapter } from '@/lib/content'

interface ChapterNavProps {
  prev: Chapter | null
  next: Chapter | null
}

export function ChapterNav({ prev, next }: ChapterNavProps) {
  return (
    <nav className="flex items-center justify-between">
      {prev ? (
        <Link
          href={`/${prev.categorySlug}/${prev.slug}`}
          className="group flex items-center gap-2 text-muted dark:text-neutral-500 hover:text-gray-900 dark:hover:text-neutral-100 transition-colors"
        >
          <motion.span whileHover={{ x: -4 }} className="text-lg">←</motion.span>
          <div>
            <p className="text-xs uppercase tracking-wider mb-0.5 font-mono">Previous</p>
            <p className="font-medium group-hover:text-gray-900 dark:group-hover:text-neutral-100 text-sm">{prev.title}</p>
          </div>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          href={`/${next.categorySlug}/${next.slug}`}
          className="group flex items-center gap-2 text-muted dark:text-neutral-500 hover:text-gray-900 dark:hover:text-neutral-100 transition-colors text-right"
        >
          <div>
            <p className="text-xs uppercase tracking-wider mb-0.5 font-mono">Next</p>
            <p className="font-medium group-hover:text-gray-900 dark:group-hover:text-neutral-100 text-sm">{next.title}</p>
          </div>
          <motion.span whileHover={{ x: 4 }} className="text-lg">→</motion.span>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  )
}
