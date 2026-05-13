'use client'

import { motion } from 'framer-motion'
import { popIn } from '@/lib/animations'

interface DifficultyBadgeProps {
  difficulty: string
}

const colorMap: Record<string, string> = {
  Beginner: 'bg-emerald-50 text-emerald-700 border-emerald-300',
  Intermediate: 'bg-amber-50 text-amber-700 border-amber-300',
  Advanced: 'bg-red-50 text-red-700 border-red-300',
}

export function DifficultyBadge({ difficulty }: DifficultyBadgeProps) {
  const color = colorMap[difficulty] ?? colorMap['Beginner']

  return (
    <motion.span
      variants={popIn}
      initial="hidden"
      animate="visible"
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border flex-shrink-0 ${color}`}
    >
      {difficulty}
    </motion.span>
  )
}
