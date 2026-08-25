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
            className="grid gap-5"
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
        className="group block overflow-hidden rounded-xl border border-gray-200 bg-white hover:shadow-md transition-all duration-200"
        style={{ borderColor: undefined }}
      >
        <div
          className="px-6 py-5 flex items-center gap-4 border-b border-gray-100"
          style={{
            background: `linear-gradient(135deg, ${company.brandColor}10 0%, ${company.brandColor}04 100%)`,
          }}
        >
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl font-bold shrink-0 shadow-md ring-4 ring-white"
            style={{
              backgroundColor: company.brandColor,
              color: '#ffffff',
            }}
          >
            {company.logoMark}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h2 className="text-2xl font-semibold text-gray-900 group-hover:text-brand-600 transition-colors">
                {company.name}
              </h2>
              <span
                className="shrink-0 px-2.5 py-0.5 rounded-full text-xs font-mono border"
                style={{
                  backgroundColor: `${company.brandColor}12`,
                  borderColor: `${company.brandColor}30`,
                  color: company.brandColor,
                }}
              >
                {company.postCount} case studies
              </span>
            </div>
            <p className="text-xs font-mono text-muted uppercase tracking-wide">{company.tagline}</p>
          </div>
        </div>

        <div className="px-6 py-4 space-y-4">
          {company.description && (
            <p className="text-sm text-muted">{company.description}</p>
          )}

          {company.featuredTopics.length > 0 && (
            <div className="flex items-center gap-1.5 flex-wrap">
              {company.featuredTopics.map(topic => (
                <span
                  key={topic}
                  className="px-2 py-0.5 rounded-full text-xs font-mono bg-gray-100 text-gray-600 border border-gray-200"
                >
                  {topic}
                </span>
              ))}
            </div>
          )}

          {company.highlightPosts.length > 0 && (
            <div>
              <p className="text-xs font-mono text-muted mb-2 uppercase tracking-wide">Featured</p>
              <ul className="space-y-1.5">
                {company.highlightPosts.map(post => (
                  <li
                    key={post.slug}
                    className="text-sm text-gray-700 flex items-center gap-2 group-hover:text-gray-900"
                  >
                    <span className="w-1 h-1 rounded-full bg-brand-500 shrink-0" />
                    <span className="line-clamp-1">{post.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  )
}
