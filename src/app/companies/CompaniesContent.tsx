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
            className="grid gap-5 sm:grid-cols-2"
          >
            {companies.map(company => (
              <CompanyCard key={company.slug} company={company} />
            ))}
          </motion.div>
        )}
      </main>

      <Footer />
    </div>
  )
}

function CompanyCard({ company }: { company: Company }) {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -3 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      <Link
        href={`/companies/${company.slug}`}
        className="group block h-full overflow-hidden rounded-xl border border-gray-200 bg-white hover:border-brand-500/50 transition-colors duration-200"
      >
        <div
          className="px-6 py-5 flex items-center gap-4"
          style={{ backgroundColor: `${company.brandColor}08` }}
        >
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-bold shrink-0 shadow-sm"
            style={{
              backgroundColor: company.brandColor,
              color: '#ffffff',
            }}
          >
            {company.logoMark}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-xl font-semibold text-gray-900 group-hover:text-brand-600 transition-colors truncate">
                {company.name}
              </h2>
              <span className="shrink-0 px-2 py-0.5 rounded-full text-xs font-mono bg-white/80 text-gray-600 border border-gray-200">
                {company.postCount} posts
              </span>
            </div>
            <p className="text-xs font-mono text-muted uppercase tracking-wide">{company.tagline}</p>
          </div>
        </div>

        {company.description && (
          <p className="px-6 py-4 text-sm text-muted line-clamp-3 border-t border-gray-100">
            {company.description}
          </p>
        )}
      </Link>
    </motion.div>
  )
}
