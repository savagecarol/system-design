'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { staggerContainer, fadeInUp, fadeIn } from '@/lib/animations'
import type { CategoryGroup } from '@/lib/content'

interface SidebarProps {
  categories: CategoryGroup[]
  activeFullSlug: string
}

export function Sidebar({ categories, activeFullSlug }: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const sidebarRef = useRef<HTMLElement>(null)

  const totalChapters = categories.reduce((acc, cat) => acc + cat.chapters.length, 0)
  const completedIndex = categories
    .flatMap(c => c.chapters)
    .findIndex(ch => ch.fullSlug === activeFullSlug)
  const progress = totalChapters > 0 ? ((completedIndex + 1) / totalChapters) * 100 : 0

  useEffect(() => {
    const handler = () => setMobileOpen(prev => !prev)
    window.addEventListener('toggleSidebar', handler)
    return () => window.removeEventListener('toggleSidebar', handler)
  }, [])

  // Restore scroll position from sessionStorage on mount
  useEffect(() => {
    const saved = sessionStorage.getItem('sidebar-scroll')
    if (saved && sidebarRef.current) {
      sidebarRef.current.scrollTop = parseInt(saved, 10)
    }
  }, [])

  function handleScroll() {
    if (sidebarRef.current) {
      sessionStorage.setItem('sidebar-scroll', sidebarRef.current.scrollTop.toString())
    }
  }

  return (
    <>
      {/* Mobile backdrop */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-10 bg-black/60 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar panel */}
      <aside
        ref={sidebarRef}
        onScroll={handleScroll}
        className={`
          fixed left-0 top-14 bottom-0 w-64 border-r border-gray-200 bg-white/95 backdrop-blur-md
          overflow-y-auto z-20 transition-transform duration-300 ease-in-out
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Progress bar */}
        <div className="px-4 py-3 border-b border-gray-200">
          <div className="flex items-center justify-between text-xs text-muted mb-1.5 font-mono">
            <span>Progress</span>
            <span className="text-brand-600">{Math.round(progress)}%</span>
          </div>
          <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-brand-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
          </div>
        </div>

        <motion.div
          variants={staggerContainer}
          initial={false}
          animate="visible"
          className="py-4"
        >
          {categories.map(cat => (
            <div key={cat.categorySlug} className="mb-4">
              <div className="px-4 py-1">
                <Link
                  href={`/${cat.categorySlug}`}
                  className="text-xs font-semibold uppercase tracking-wider text-muted font-mono hover:text-brand-600"
                >
                  {cat.category}
                </Link>
              </div>
              {cat.chapters.map(chapter => {
                const isActive = chapter.fullSlug === activeFullSlug
                return (
                  <motion.div key={chapter.fullSlug} variants={fadeInUp}>
                    <Link
                      href={`/${chapter.categorySlug}/${chapter.slug}`}
                      onClick={() => setMobileOpen(false)}
                      className={`block px-4 py-2 text-sm transition-colors rounded-lg mx-2 ${
                        isActive
                          ? 'bg-brand-500/15 text-brand-600 font-medium border-l-2 border-brand-500 pl-3.5'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      {chapter.title}
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          ))}
        </motion.div>
      </aside>
    </>
  )
}
