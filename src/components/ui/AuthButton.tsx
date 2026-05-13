'use client'

import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { scaleIn } from '@/lib/animations'
import { useAuth } from './AuthProvider'
import { signInWithGoogle, signOut } from '@/lib/auth'

export function AuthButton() {
  const { user, loading } = useAuth()
  const [open, setOpen] = useState(false)

  if (loading) {
    return <div className="w-8 h-8 rounded-full bg-surface dark:bg-neutral-800 animate-pulse" />
  }

  if (!user) {
    return (
      <button
        onClick={() => signInWithGoogle()}
        className="px-4 py-1.5 text-sm font-medium bg-brand-500 hover:bg-brand-600 text-white rounded-lg transition-colors"
      >
        Sign in
      </button>
    )
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-8 h-8 rounded-full overflow-hidden border-2 border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-neutral-950"
      >
        {user.photoURL ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={user.photoURL} alt={user.displayName ?? 'User'} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-brand-500 flex items-center justify-center text-white text-xs font-bold">
            {user.displayName?.charAt(0) ?? 'U'}
          </div>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <motion.div
              variants={scaleIn}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.15 } }}
              className="absolute right-0 top-10 z-50 w-52 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl shadow-xl py-1 overflow-hidden"
            >
              <div className="px-4 py-3 border-b border-gray-200 dark:border-neutral-800">
                <p className="text-sm font-medium text-gray-900 dark:text-neutral-100 truncate">{user.displayName}</p>
                <p className="text-xs text-muted dark:text-neutral-500 truncate">{user.email}</p>
              </div>
              <button
                onClick={() => { signOut(); setOpen(false) }}
                className="w-full text-left px-4 py-2 text-sm text-gray-900 dark:text-neutral-100 hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors"
              >
                Sign out
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
