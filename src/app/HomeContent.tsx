'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Fuse from 'fuse.js'
import { motion } from 'framer-motion'
import { staggerContainer, fadeInUp, fadeIn } from '@/lib/animations'
import { DifficultyBadge } from '@/components/ui/DifficultyBadge'
import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import type { getChaptersByCategory, Chapter } from '@/lib/content'

type Categories = ReturnType<typeof getChaptersByCategory>

interface HomeContentProps {
  categories: Categories
  totalChapters: number
}

export function HomeContent({ categories, totalChapters }: HomeContentProps) {
  const [query, setQuery] = useState('')

  const allChapters = useMemo(
    () => categories.flatMap(cat => cat.chapters),
    [categories]
  )

  const fuse = useMemo(
    () =>
      new Fuse(allChapters, {
        keys: ['title', 'description', 'category'],
        threshold: 0.35,
        includeScore: true,
      }),
    [allChapters]
  )

  const searchResults = useMemo(() => {
    if (!query.trim()) return null
    return fuse.search(query.trim()).map(r => r.item)
  }, [query, fuse])

  return (
    <div className="min-h-screen bg-canvas">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 pt-24 pb-16">
        <HeroSection totalChapters={totalChapters} query={query} onSearch={setQuery} />

        {searchResults ? (
          <SearchResults results={searchResults} query={query} />
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="mt-16 space-y-12"
          >
            {categories.map((cat) => (
              <CategoryGroup key={cat.categorySlug} category={cat} />
            ))}
          </motion.div>
        )}
      </main>

      <Footer />
    </div>
  )
}

function HeroSection({
  totalChapters,
  query,
  onSearch,
}: {
  totalChapters: number
  query: string
  onSearch: (v: string) => void
}) {
  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      className="text-center py-16"
    >
      <motion.div
        variants={fadeInUp}
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-500 text-sm font-mono mb-6"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
        {totalChapters} chapters available
      </motion.div>

      <motion.h1
        variants={fadeInUp}
        className="text-5xl font-bold text-gray-900 mb-4 tracking-tight"
      >
        Learn System Design
        <span className="block text-brand-500 mt-1">Visually</span>
      </motion.h1>

      <motion.p
        variants={fadeInUp}
        className="text-xl text-muted max-w-2xl mx-auto leading-relaxed mb-8"
      >
        Master system design concepts through interactive Excalidraw diagrams.
        Draw your own notes, track progress, and ace your next interview.
      </motion.p>

      <motion.div variants={fadeInUp} className="relative max-w-lg mx-auto">
        <svg
          className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          value={query}
          onChange={e => onSearch(e.target.value)}
          placeholder="Search any topic"
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition shadow-sm"
        />
      </motion.div>
    </motion.div>
  )
}

function SearchResults({ results, query }: { results: Chapter[]; query: string }) {
  return (
    <motion.div variants={fadeIn} initial="hidden" animate="visible" className="mt-8">
      <p className="text-sm text-muted mb-6 font-mono">
        {results.length} result{results.length !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;
      </p>
      {results.length === 0 ? (
        <p className="text-center text-muted py-16">No chapters match your search.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.map(chapter => (
            <ChapterCard key={chapter.fullSlug} chapter={chapter} />
          ))}
        </div>
      )}
    </motion.div>
  )
}

function CategoryGroup({ category }: { category: Categories[number] }) {
  return (
    <motion.section variants={fadeInUp}>
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-xl font-bold text-gray-900">{category.category}</h2>
        <span className="text-xs text-muted px-2 py-0.5 rounded-full bg-gray-100 font-mono">
          {category.chapters.length} chapters
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {category.chapters.map(chapter => (
          <ChapterCard key={chapter.fullSlug} chapter={chapter} />
        ))}
      </div>
    </motion.section>
  )
}

function ChapterCard({ chapter }: { chapter: Categories[number]['chapters'][number] }) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      <Link
        href={`/${chapter.categorySlug}/${chapter.slug}`}
        className="group block p-5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 hover:border-brand-500/50 transition-colors duration-200"
      >
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3 className="font-semibold text-gray-900 group-hover:text-brand-600 transition-colors leading-tight min-w-0 line-clamp-2">
            {chapter.title}
          </h3>
          <DifficultyBadge difficulty={chapter.difficulty} />
        </div>
        {chapter.description && (
          <p className="text-sm text-muted line-clamp-2 mb-3">{chapter.description}</p>
        )}
        <div className="flex items-center gap-1 text-xs text-muted font-mono">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {chapter.readTime} min read
        </div>
      </Link>
    </motion.div>
  )
}
