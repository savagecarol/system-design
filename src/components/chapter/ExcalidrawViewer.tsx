'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import { scaleIn, fadeIn } from '@/lib/animations'

const Excalidraw = dynamic(
  () => import('@excalidraw/excalidraw').then(mod => mod.Excalidraw),
  { ssr: false }
)

interface ExcalidrawViewerProps {
  diagramPath: string
  title: string
}

interface ExcalidrawData {
  elements: unknown[]
  appState: Record<string, unknown>
  files?: Record<string, unknown>
}

export function ExcalidrawViewer({ diagramPath, title }: ExcalidrawViewerProps) {
  const [data, setData] = useState<ExcalidrawData | null>(null)
  const [error, setError] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setData(null)
    setError(false)
    setLoaded(false)

    fetch(diagramPath)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((json: ExcalidrawData) => {
        setData(json)
        setLoaded(true)
      })
      .catch(err => {
        console.error('Failed to load diagram:', err)
        setError(true)
      })
  }, [diagramPath])

  if (error) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-surface/30">
        <div className="text-center">
          <p className="text-gray-900 font-medium mb-1">Diagram not available</p>
          <p className="text-muted text-sm">The diagram file could not be loaded.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="absolute inset-0">
      {/* Loading overlay */}
      <AnimatePresence>
        {!loaded && (
          <motion.div
            variants={fadeIn}
            initial="visible"
            exit="hidden"
            className="absolute inset-0 bg-slate-50 flex items-center justify-center z-10"
          >
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
              <span className="text-slate-400 text-sm font-mono">Loading {title}…</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Excalidraw canvas */}
      <AnimatePresence>
        {loaded && data && (
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            className="absolute inset-0 overflow-hidden excalidraw-viewer"
          >
            <Excalidraw
              initialData={{
                elements: data.elements as never[],
                appState: {
                  ...data.appState,
                  viewBackgroundColor: '#f8fafc',
                  theme: 'light',
                  viewModeEnabled: true,
                },
                files: data.files as never,
                scrollToContent: true,
              }}
              viewModeEnabled={true}
              zenModeEnabled={false}
              gridModeEnabled={false}
              UIOptions={{
                canvasActions: {
                  changeViewBackgroundColor: false,
                  clearCanvas: false,
                  export: false,
                  loadScene: false,
                  saveToActiveFile: false,
                  toggleTheme: false,
                },
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}