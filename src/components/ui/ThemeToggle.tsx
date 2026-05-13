'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  // Render a same-size placeholder until mounted to prevent layout shift.
  // resolvedTheme is undefined during SSR — mounting guard ensures we only
  // render the real toggle on the client where localStorage is available.
  if (!mounted) return <div className="w-12 h-6" aria-hidden="true" />

  const isDark = resolvedTheme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      role="switch"
      aria-checked={isDark}
      aria-label="Toggle dark mode"
      className={`relative w-12 h-6 rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
        isDark ? 'bg-brand-500' : 'bg-gray-200'
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm flex items-center justify-center text-xs transition-transform duration-200 ${
          isDark ? 'translate-x-6' : 'translate-x-0'
        }`}
      >
        {isDark ? '☀️' : '🌙'}
      </span>
    </button>
  )
}
