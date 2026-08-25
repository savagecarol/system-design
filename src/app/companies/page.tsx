import type { Metadata } from 'next'
import { getAllCompanies } from '@/lib/companies'
import { CompaniesContent } from './CompaniesContent'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Company System Design Case Studies',
  description:
    'Real-world system design case studies from companies like Twitter/X — timelines, search, storage, and load balancing at scale.',
  path: '/companies',
  ogImageAlt: 'Company system design case studies',
})

export default function CompaniesPage() {
  const companies = getAllCompanies()
  return <CompaniesContent companies={companies} />
}
