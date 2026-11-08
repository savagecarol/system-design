'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { fadeIn, fadeInUp } from '@/lib/animations'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { MarkdownArticle } from '@/components/apps/MarkdownArticle'
import type { AppRecord } from '@/lib/apps'

interface InstructionsContentProps {
  app: AppRecord
  promptHtml: string
  instructionsHtml: string
}

export function InstructionsContent({
  app,
  promptHtml,
  instructionsHtml,
}: InstructionsContentProps) {
  return (
    <div className="min-h-screen bg-canvas">
      <Navbar currentPage={`/app/${app.slug}/instructions`} />

      <main className="max-w-3xl mx-auto px-4 pt-24 pb-16">
        <motion.div variants={fadeIn} initial="hidden" animate="visible" className="mb-10">
          <p className="text-sm font-mono text-muted mb-2">
            <Link href="/app" className="hover:text-brand-600">
              Apps
            </Link>
            <span className="mx-2">/</span>
            <Link href={`/app/${app.slug}`} className="hover:text-brand-600">
              {app.name}
            </Link>
          </p>
          <h1 className="text-4xl font-bold text-gray-900 mb-3 tracking-tight">
            Build {app.name}
          </h1>
          <p className="text-muted text-base">{app.description}</p>
        </motion.div>

        <motion.section
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="mb-12"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Rebuild prompt</h2>
          <p className="text-sm text-muted mb-4">
            Use this as a starting prompt with an AI coding agent, then adapt it to your stack.
          </p>
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <MarkdownArticle html={promptHtml} variant="light" className="text-gray-800" />
          </div>
        </motion.section>

        <motion.section
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="mb-12"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Steps</h2>
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <MarkdownArticle html={instructionsHtml} variant="light" className="text-gray-800" />
          </div>
        </motion.section>

        {app.screenshotPaths.length > 0 && (
          <motion.section variants={fadeInUp} initial="hidden" animate="visible" className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Reference images</h2>
            <p className="text-sm text-muted mb-4">
              Visual direction references used while designing {app.name}.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {app.screenshotPaths.map((src, index) => (
                <div
                  key={src}
                  className="relative overflow-hidden rounded-xl border border-gray-200 aspect-[4/3] bg-gray-50"
                >
                  <Image
                    src={src}
                    alt={`${app.name} reference ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>
              ))}
            </div>
          </motion.section>
        )}
      </main>

      <Footer />
    </div>
  )
}
