'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { useAuth } from '@/components/ui/AuthProvider'
import { loadNotes, setLocalNotes, saveNotesToFirestore } from '@/lib/notes'
import { useToast } from '@/components/ui/ToastProvider'
import type { Chapter } from '@/lib/content'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyAppState = any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ExcalidrawImperativeAPI = any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ExcalidrawElement = any

const Excalidraw = dynamic(
  () => import('@excalidraw/excalidraw').then(mod => mod.Excalidraw),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full bg-white flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
      </div>
    ),
  }
)

interface NotesCanvasProps {
  chapter: Chapter
  // True once the parent drawer's slide-in animation has completed. We defer
  // scene injection until then so Excalidraw doesn't measure its container
  // mid-animation (which corrupts pointer hit-testing).
  isFullyOpen: boolean
}

const DEBOUNCE_MS = 2000

// Persist drawing-style preferences + viewport (scroll/zoom) so users see their
// drawing exactly where they left it. Never persist UI state (selections,
// editing state, open menus, active tool) — those corrupt the canvas on reload.
function pickSaveableAppState(appState: AnyAppState): Record<string, unknown> {
  const out: Record<string, unknown> = {
    viewBackgroundColor: appState.viewBackgroundColor ?? '#ffffff',
    currentItemStrokeColor: appState.currentItemStrokeColor ?? '#1e1e1e',
    currentItemBackgroundColor: appState.currentItemBackgroundColor ?? 'transparent',
  }
  // Viewport — save so reload restores the exact view the user had
  if (typeof appState.scrollX === 'number') out.scrollX = appState.scrollX
  if (typeof appState.scrollY === 'number') out.scrollY = appState.scrollY
  if (appState.zoom?.value !== undefined) out.zoom = { value: appState.zoom.value }
  // Optional style fields — only include if defined
  const optional = [
    'currentItemFillStyle',
    'currentItemStrokeWidth',
    'currentItemStrokeStyle',
    'currentItemRoughness',
    'currentItemOpacity',
    'currentItemFontFamily',
    'currentItemFontSize',
    'currentItemTextAlign',
  ] as const
  for (const k of optional) {
    if (appState[k] !== undefined) out[k] = appState[k]
  }
  return out
}

interface LoadedScene {
  elements: ExcalidrawElement[]
  appState: Record<string, unknown>
}

export function NotesCanvas({ chapter, isFullyOpen }: NotesCanvasProps) {
  const { user } = useAuth()
  const { showToast } = useToast()
  const [excalidrawAPI, setExcalidrawAPI] = useState<ExcalidrawImperativeAPI | null>(null)
  const [pendingScene, setPendingScene] = useState<LoadedScene | null>(null)
  const [sceneInjected, setSceneInjected] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)

  // Holds latest scene so unmount-save never depends on a live Excalidraw instance
  const latestSceneRef = useRef<LoadedScene | null>(null)
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const mountedRef = useRef(true)
  const userRef = useRef(user)
  userRef.current = user
  // Until injection completes, ignore onChange — Excalidraw fires onChange events
  // during our own updateScene call which would overwrite saved data with stale state.
  const sceneInjectedRef = useRef(false)
  // Container element for ResizeObserver — Excalidraw needs refresh() whenever
  // the container size changes so pointer event hit-testing stays accurate.
  const containerRef = useRef<HTMLDivElement | null>(null)

  // ─── Effect 1: load saved scene from storage when API ready / chapter changes ──
  useEffect(() => {
    if (!excalidrawAPI) return
    let cancelled = false
    sceneInjectedRef.current = false
    setSceneInjected(false)
    setPendingScene(null)

    loadNotes(user, chapter.fullSlug).then(json => {
      if (cancelled) return

      let elements: ExcalidrawElement[] = []
      let savedAppState: Record<string, unknown> = {}

      if (json) {
        try {
          const parsed = JSON.parse(json)
          const raw: ExcalidrawElement[] = parsed.elements ?? []
          // Strip soft-deleted elements — they corrupt selection and hit-testing on reload
          elements = raw.filter(el => !el?.isDeleted)
          savedAppState = parsed.appState ?? {}
        } catch {
          // Corrupt JSON — start fresh
        }
      }

      setPendingScene({ elements, appState: savedAppState })
    })

    return () => { cancelled = true }
  }, [excalidrawAPI, user, chapter.fullSlug])

  // ─── Effect 2: inject scene only AFTER drawer animation completes ─────────────
  // This is the critical fix. If we inject during the drawer slide-in, Excalidraw
  // measures its container at the wrong (mid-animation) position and pointer
  // hit-testing breaks — drawings render correctly but can't be clicked/edited.
  useEffect(() => {
    if (!excalidrawAPI || !pendingScene || !isFullyOpen) return
    let cancelled = false

    const { elements } = pendingScene
    const appState = {
      ...pickSaveableAppState(pendingScene.appState),
      viewBackgroundColor: '#ffffff',
    }

    // Force a refresh first so Excalidraw measures the container at its final
    // (post-animation) size and position before we inject elements.
    try { excalidrawAPI.refresh() } catch { /* noop */ }

    excalidrawAPI.updateScene({ elements, appState })

    // Clear undo/redo so the loaded scene becomes the baseline — otherwise the
    // user could "undo" their loaded drawing back to nothing.
    try { excalidrawAPI.history?.clear?.() } catch { /* noop */ }

    latestSceneRef.current = { elements, appState }

    // One more refresh in the next frame — handles any layout changes from
    // injecting elements (e.g. if Excalidraw resizes its toolbar).
    requestAnimationFrame(() => {
      if (cancelled || !excalidrawAPI) return
      try { excalidrawAPI.refresh() } catch { /* noop */ }
      sceneInjectedRef.current = true
      setSceneInjected(true)
    })

    return () => { cancelled = true }
  }, [excalidrawAPI, pendingScene, isFullyOpen])

  // ─── Effect 3: refresh canvas on container resize ─────────────────────────────
  // Window resizes, drawer width changes, etc. — keep hit-testing in sync.
  useEffect(() => {
    const el = containerRef.current
    if (!el || !excalidrawAPI) return

    const ro = new ResizeObserver(() => {
      try { excalidrawAPI.refresh() } catch { /* noop */ }
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [excalidrawAPI])

  // ─── On unmount: flush debounce and sync-save to localStorage ─────────────────
  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
      if (debounceTimer.current) clearTimeout(debounceTimer.current)

      if (latestSceneRef.current) {
        const json = JSON.stringify({
          elements: latestSceneRef.current.elements,
          appState: pickSaveableAppState(latestSceneRef.current.appState),
        })
        setLocalNotes(chapter.fullSlug, json)
        if (userRef.current) {
          saveNotesToFirestore(userRef.current, chapter.fullSlug, chapter.title, json).catch(
            err => console.error('Failed to save notes on close:', err)
          )
        }
      }
    }
  }, [chapter.fullSlug, chapter.title])

  // ─── onChange: capture latest scene & debounce save ───────────────────────────
  const handleChange = useCallback(
    (elements: readonly ExcalidrawElement[], appState: AnyAppState) => {
      // Ignore changes fired by our own updateScene call during initial load
      if (!sceneInjectedRef.current) return

      const activeElements = elements.filter(el => !el?.isDeleted)
      latestSceneRef.current = { elements: activeElements, appState }

      if (debounceTimer.current) clearTimeout(debounceTimer.current)
      debounceTimer.current = setTimeout(() => {
        const json = JSON.stringify({
          elements: activeElements,
          appState: pickSaveableAppState(appState),
        })
        setLocalNotes(chapter.fullSlug, json)

        if (userRef.current) {
          saveNotesToFirestore(userRef.current, chapter.fullSlug, chapter.title, json)
            .then(() => { if (mountedRef.current) setLastSaved(new Date()) })
            .catch(err => console.error('Failed to auto-save notes:', err))
        } else {
          if (mountedRef.current) setLastSaved(new Date())
        }
      }, DEBOUNCE_MS)
    },
    [chapter.fullSlug, chapter.title]
  )

  const handleSave = () => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current)
    const scene = latestSceneRef.current
    if (!scene) return

    const json = JSON.stringify({
      elements: scene.elements,
      appState: pickSaveableAppState(scene.appState),
    })
    setLocalNotes(chapter.fullSlug, json)

    if (user) {
      saveNotesToFirestore(user, chapter.fullSlug, chapter.title, json)
        .then(() => {
          setLastSaved(new Date())
          showToast('Notes saved', 'success')
        })
        .catch(err => console.error('Failed to save notes:', err))
    } else {
      setLastSaved(new Date())
      showToast('Notes saved locally', 'success')
    }
  }

  const handleClear = () => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current)
    if (!excalidrawAPI) return

    const appState = {
      viewBackgroundColor: '#ffffff',
      currentItemStrokeColor: '#1e1e1e',
      currentItemBackgroundColor: 'transparent',
    }
    const json = JSON.stringify({ elements: [], appState })
    latestSceneRef.current = { elements: [], appState }
    setLocalNotes(chapter.fullSlug, json)

    if (user) {
      saveNotesToFirestore(user, chapter.fullSlug, chapter.title, json).catch(
        err => console.error('Failed to clear notes:', err)
      )
    }

    excalidrawAPI.updateScene({ elements: [], appState })
    try { excalidrawAPI.history?.clear?.() } catch { /* noop */ }
    try { excalidrawAPI.refresh() } catch { /* noop */ }
    showToast('Notes cleared', 'info')
  }

  const showLoadingOverlay = !sceneInjected

  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="flex-1 min-h-0 relative">
        <div ref={containerRef} className="absolute inset-0 excalidraw-notes">
          <Excalidraw
            // Re-key on chapter so each chapter gets a fresh Excalidraw instance.
            key={chapter.fullSlug}
            excalidrawAPI={(api: ExcalidrawImperativeAPI) => setExcalidrawAPI(api)}
            onChange={handleChange as never}
            theme="light"
            UIOptions={{
              canvasActions: {
                changeViewBackgroundColor: true,
                export: false,
                loadScene: false,
                saveToActiveFile: false,
                toggleTheme: false,
                clearCanvas: false,
              },
            }}
          />
          {/* Overlay covers the empty canvas until injection completes, so users
              never see a flash of empty state before their drawing appears. */}
          {showLoadingOverlay && (
            <div className="absolute inset-0 bg-white flex items-center justify-center pointer-events-none z-10">
              <div className="w-6 h-6 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between px-3 py-2 border-t border-gray-200 dark:border-neutral-800 bg-gray-50 dark:bg-neutral-900 shrink-0">
        <div className="flex items-center gap-2">
          <button
            onClick={handleSave}
            className="px-3 py-1.5 text-xs font-medium bg-brand-500 hover:bg-brand-600 text-white rounded-lg transition-colors"
          >
            Save
          </button>
          <button
            onClick={handleClear}
            className="px-3 py-1.5 text-xs font-medium bg-gray-200 dark:bg-neutral-800 hover:bg-gray-300 dark:hover:bg-neutral-700 text-gray-700 dark:text-neutral-300 rounded-lg transition-colors"
          >
            Clear
          </button>
        </div>
        {lastSaved && (
          <span className="text-xs text-gray-400 dark:text-neutral-500">
            Saved {lastSaved.toLocaleTimeString()}
          </span>
        )}
        {!user && (
          <span className="text-xs text-red-400">
            Sign in to sync notes
          </span>
        )}
      </div>
    </div>
  )
}
