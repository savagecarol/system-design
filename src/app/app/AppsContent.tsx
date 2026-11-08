'use client'

import { motion } from 'framer-motion'
import { fadeIn, fadeInUp, staggerContainer } from '@/lib/animations'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { AppIndexCard } from '@/components/apps/AppIndexCard'
import type { AppRecord } from '@/lib/apps'

interface AppsContentProps {
  apps: AppRecord[]
}

export function AppsContent({ apps }: AppsContentProps) {
  return (
    <div className="min-h-screen bg-canvas">
      <Navbar currentPage="/app" />

      <main className="max-w-4xl mx-auto px-4 pt-24 pb-16">
        <motion.div variants={fadeIn} initial="hidden" animate="visible" className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 tracking-tight">Apps</h1>
          <p className="text-muted text-base">
            Products I&apos;m shipping — marketing pages, privacy policies, and build instructions.
          </p>
        </motion.div>

        {apps.length === 0 ? (
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="text-muted text-center py-16"
          >
            No apps yet.
          </motion.p>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid gap-5"
          >
            {apps.map(app => (
              <motion.div key={app.slug} variants={fadeInUp}>
                <AppIndexCard app={app} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </main>

      <Footer />
    </div>
  )
}
