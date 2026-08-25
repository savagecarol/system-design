'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { slideDown } from '@/lib/animations'
import { AuthButton } from '@/components/ui/AuthButton'
import { PresenceCounter } from '@/components/ui/PresenceCounter'

interface NavbarProps {
  currentPage?: string
  showMenuButton?: boolean
}

export function Navbar({ currentPage = '/', showMenuButton = false }: NavbarProps) {
  function handleMenuClick() {
    window.dispatchEvent(new CustomEvent('toggleSidebar'))
  }

  return (
    <motion.nav
      variants={slideDown}
      initial="hidden"
      animate="visible"
      className="fixed top-0 left-0 right-0 z-30 h-14 border-b border-gray-200 bg-white/90 backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto h-full px-4 grid grid-cols-3 items-center">
        {/* Left — logo + optional hamburger */}
        <div className="flex items-center gap-3">
          {showMenuButton && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleMenuClick}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 text-muted hover:text-gray-900 transition-colors"
              aria-label="Toggle sidebar"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </motion.button>
          )}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-gray-900 hover:text-brand-600 transition-colors font-mono"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-brand-500">
              <rect x="1" y="1" width="7" height="7" rx="1.5" fill="currentColor" />
              <rect x="12" y="1" width="7" height="7" rx="1.5" fill="currentColor" fillOpacity="0.6" />
              <rect x="1" y="12" width="7" height="7" rx="1.5" fill="currentColor" fillOpacity="0.6" />
              <rect x="12" y="12" width="7" height="7" rx="1.5" fill="currentColor" fillOpacity="0.3" />
            </svg>
            <span className="hidden sm:block">DesigningSystems.dev</span>
          </Link>
        </div>

        {/* Center — Blog + Companies + YouTube */}
        <div className="flex items-center justify-center gap-1">
          <Link
            href="/blog"
            className="px-3 py-1.5 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
          >
            Blog
          </Link>
          <Link
            href="/companies"
            className="px-3 py-1.5 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
          >
            Companies
          </Link>
          <a
            href="https://youtube.com/@savagecarol"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors"
            aria-label="YouTube channel"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            <span className="hidden sm:block">YouTube</span>
          </a>
        </div>

        {/* Right — presence + auth */}
        <div className="flex items-center justify-end gap-4">
          <PresenceCounter page={currentPage} />
          <AuthButton />
        </div>
      </div>
    </motion.nav>
  )
}