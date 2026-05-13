'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { slideInRight, fadeIn } from '@/lib/animations'
import { NotesCanvas } from '@/components/notes/NotesCanvas'
import type { Chapter } from '@/lib/content'

interface NotesDrawerProps {
  isOpen: boolean
  onClose: () => void
  chapter: Chapter
}

export function NotesDrawer({ isOpen, onClose, chapter }: NotesDrawerProps) {
  // Tracks whether the slide-in spring animation has finished. We use this to
  // defer Excalidraw scene injection until the drawer is at its final position —
  // otherwise Excalidraw measures its container mid-animation and the resulting
  // canvas coordinate mapping is wrong, breaking pointer hit-testing.
  const [isFullyOpen, setIsFullyOpen] = useState(false)

  return (
    <AnimatePresence onExitComplete={() => setIsFullyOpen(false)}>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            animate="visible"
            exit="exit"
            onAnimationComplete={(definition) => {
              if (definition === 'visible') setIsFullyOpen(true)
            }}
            className="fixed right-0 top-0 bottom-0 z-50 w-[85vw] bg-white border-l border-gray-200 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white shrink-0">
              <div>
                <h2 className="font-semibold text-gray-900">My Notes</h2>
                <p className="text-xs text-gray-500">{chapter.title}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-900 transition-colors"
                aria-label="Close notes"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Canvas — no overflow-hidden so Excalidraw's floating color picker isn't clipped */}
            <div className="flex-1 min-h-0">
              <NotesCanvas chapter={chapter} isFullyOpen={isFullyOpen} />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
