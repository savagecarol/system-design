'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { fadeInUp } from '@/lib/animations'
import { DifficultyBadge } from '@/components/ui/DifficultyBadge'
import type { Chapter } from '@/lib/content'

interface ChapterHeaderProps {
  chapter: Chapter
  visitCount: number
}

export function ChapterHeader({ chapter, visitCount }: ChapterHeaderProps) {
  return (
    <motion.header
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      className="mb-8"
    >
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-muted mb-4">
        <Link href="/" className="hover:text-gray-900 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-gray-600">{chapter.category}</span>
        <span>/</span>
        <span className="text-gray-900">{chapter.title}</span>
      </nav>

      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{chapter.title}</h1>

      {/* Meta row */}
      <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
        <DifficultyBadge difficulty={chapter.difficulty} />
        <span className="flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {chapter.readTime} min read
        </span>
        {visitCount > 0 && (
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            {visitCount.toLocaleString()} views
          </span>
        )}
      </div>

      {chapter.description && (
        <p className="mt-4 text-muted leading-relaxed">{chapter.description}</p>
      )}
    </motion.header>
  )
}
