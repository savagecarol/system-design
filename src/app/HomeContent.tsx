'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { staggerContainer, fadeInUp, fadeIn } from '@/lib/animations'
import { DifficultyBadge } from '@/components/ui/DifficultyBadge'
import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import type { getChaptersByCategory } from '@/lib/content'

type Categories = ReturnType<typeof getChaptersByCategory>

interface HomeContentProps {
  categories: Categories
  totalChapters: number
}

export function HomeContent({ categories, totalChapters }: HomeContentProps) {
  return (
    <div className="min-h-screen bg-canvas">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 pt-24 pb-16">
        <HeroSection totalChapters={totalChapters} />

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
      </main>

      <Footer />
    </div>
  )
}

function HeroSection({ totalChapters }: { totalChapters: number }) {
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
        className="text-xl text-muted max-w-2xl mx-auto leading-relaxed"
      >
        Master system design concepts through interactive Excalidraw diagrams.
        Draw your own notes, track progress, and ace your next interview.
      </motion.p>
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