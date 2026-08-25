'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { fadeIn, fadeInUp, staggerContainer } from '@/lib/animations'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import type { Company } from '@/lib/companies'

interface CompaniesContentProps {
  companies: Company[]
}

export function CompaniesContent({ companies }: CompaniesContentProps) {
  return (
    <div className="min-h-screen bg-canvas">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 pt-24 pb-16">
        <motion.div variants={fadeIn} initial="hidden" animate="visible" className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 tracking-tight">Companies</h1>
          <p className="text-muted text-base">
            Real-world system design case studies — how companies built systems at scale.
          </p>
        </motion.div>

        {companies.length === 0 ? (
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="text-muted text-center py-16"
          >
            No company case studies yet.
          </motion.p>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid gap-4 sm:grid-cols-2"
          >
            {companies.map(company => (
              <motion.div
                key={company.slug}
                variants={fadeInUp}
                whileHover={{ y: -2 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                <Link
                  href={`/companies/${company.slug}`}
                  className="group block h-full p-6 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 hover:border-brand-500/50 transition-colors duration-200"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h2 className="text-xl font-semibold text-gray-900 group-hover:text-brand-600 transition-colors">
                      {company.name}
                    </h2>
                    <span className="shrink-0 px-2.5 py-1 rounded-full text-xs font-mono bg-red-50 text-red-600 border border-red-400">
                      {company.postCount} {company.postCount === 1 ? 'post' : 'posts'}
                    </span>
                  </div>
                  {company.description && (
                    <p className="text-sm text-muted line-clamp-3">{company.description}</p>
                  )}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </main>

      <Footer />
    </div>
  )
}
