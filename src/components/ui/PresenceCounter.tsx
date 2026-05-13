'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { popIn } from '@/lib/animations'
import { trackPresence, subscribeToPresenceCount } from '@/lib/presence'

interface PresenceCounterProps {
  page: string
}

export function PresenceCounter({ page }: PresenceCounterProps) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const cleanup = trackPresence(page)
    const unsubscribe = subscribeToPresenceCount(setCount)

    return () => {
      cleanup()
      unsubscribe()
    }
  }, [page])

  return (
    <div className="flex items-center gap-1.5 text-sm text-muted dark:text-neutral-500">
      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
      <AnimatePresence mode="wait">
        <motion.span
          key={count}
          variants={popIn}
          initial="hidden"
          animate="visible"
          className="font-medium text-gray-900 dark:text-neutral-100"
        >
          {count}
        </motion.span>
      </AnimatePresence>
      <span>online</span>
    </div>
  )
}
