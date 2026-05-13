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
      <div className="max-w-7xl mx-auto h-full px-4 flex items-center justify-between">
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
            <span>DesigningSystems.dev</span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <PresenceCounter page={currentPage} />
          <AuthButton />
        </div>
      </div>
    </motion.nav>
  )
}