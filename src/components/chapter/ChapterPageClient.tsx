'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { NotesDrawer } from '@/components/notes/NotesDrawer'
import { incrementVisit } from '@/lib/visits'
import type { Chapter } from '@/lib/content'

interface ChapterPageClientProps {
  chapter: Chapter
  children?: React.ReactNode
}

export function ChapterPageClient({ chapter, children }: ChapterPageClientProps) {
  const [notesOpen, setNotesOpen] = useState(false)

  useEffect(() => {
    incrementVisit(chapter.fullSlug)
  }, [chapter.fullSlug])

  return (
    <>
      {children}

      {/* Notes button — absolute bottom-right of the canvas container */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        transition={{ delay: 0.4, type: 'spring', stiffness: 400, damping: 20 }}
        onClick={() => setNotesOpen(true)}
        className="absolute bottom-6 right-6 z-20 flex items-center gap-2 px-4 py-2.5 bg-brand-500 hover:bg-brand-600 text-black rounded-full shadow-xl font-medium text-sm font-mono"
        aria-label="Open notes"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
        Notes
      </motion.button>

      <NotesDrawer
        isOpen={notesOpen}
        onClose={() => setNotesOpen(false)}
        chapter={chapter}
      />
    </>
  )
}
