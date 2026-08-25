'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Fuse from 'fuse.js'
import { motion } from 'framer-motion'
import { fadeIn, fadeInUp, staggerContainer } from '@/lib/animations'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import type { Company, CompanyPost } from '@/lib/companies'

const POSTS_PER_PAGE = 6

interface CompanyPostsContentProps {
  company: Company
  posts: CompanyPost[]
}

export function CompanyPostsContent({ company, posts }: CompanyPostsContentProps) {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)

  const fuse = useMemo(
    () =>
      new Fuse(posts, {
        keys: ['title', 'description', 'tags'],
        threshold: 0.35,
        includeScore: true,
      }),
    [posts]
  )

  const filtered = useMemo(() => {
    if (!query.trim()) return posts
    return fuse.search(query.trim()).map(r => r.item)
  }, [query, fuse, posts])

  const totalPages = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE))
  const currentPage = Math.min(page, totalPages)
  const paginated = filtered.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE)

  return (
    <div className="min-h-screen bg-canvas">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 pt-24 pb-16">
        <motion.div variants={fadeIn} initial="hidden" animate="visible" className="mb-10">
          <Link
            href="/companies"
            className="inline-flex items-center gap-1 text-xs font-mono text-muted hover:text-brand-600 transition-colors mb-4"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Companies
          </Link>

          <div className="flex items-start gap-4 mb-6">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl font-bold shrink-0 shadow-sm"
              style={{ backgroundColor: company.brandColor, color: '#ffffff' }}
            >
              {company.logoMark}
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-1 tracking-tight">{company.name}</h1>
              <p className="text-xs font-mono text-muted uppercase tracking-wide mb-2">{company.tagline}</p>
              {company.description && (
                <p className="text-muted text-base">{company.description}</p>
              )}
            </div>
          </div>

          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted"
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
              onChange={e => {
                setQuery(e.target.value)
                setPage(1)
              }}
              placeholder={`Search ${company.name} case studies`}
              className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm text-gray-900 placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition"
            />
          </div>
        </motion.div>

        {paginated.length === 0 ? (
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="text-muted text-center py-16"
          >
            No posts match your search.
          </motion.p>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            {paginated.map(post => (
              <motion.div
                key={post.slug}
                variants={fadeInUp}
                whileHover={{ y: -2 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                <Link
                  href={`/companies/${company.slug}/${post.slug}`}
                  className="group flex items-start gap-6 p-5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 hover:border-brand-500/50 transition-colors duration-200"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h2 className="font-semibold text-gray-900 group-hover:text-brand-600 transition-colors leading-tight">
                        {post.title}
                      </h2>
                      {post.date && (
                        <span className="shrink-0 text-xs font-mono text-muted pt-0.5">
                          {new Date(post.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                      )}
                    </div>

                    {post.description && (
                      <p className="text-sm text-muted line-clamp-2 mb-3">{post.description}</p>
                    )}

                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="px-2 py-0.5 rounded-full text-xs font-mono bg-red-50 text-red-600 border border-red-400">
                        {company.name}
                      </span>

                      {post.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-full text-xs font-mono bg-brand-500/10 text-brand-600 border border-brand-500/20"
                        >
                          {tag}
                        </span>
                      ))}

                      <div className="flex items-center gap-1 text-xs text-muted font-mono ml-auto">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        {post.readTime} min read
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}

        {totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-3">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              ← Previous
            </button>
            <span className="text-sm text-muted font-mono">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              Next →
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
