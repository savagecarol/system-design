import type { Metadata } from 'next'
import { getAllCompanies } from '@/lib/companies'
import { CompaniesContent } from './CompaniesContent'

export const metadata: Metadata = {
  title: 'Companies',
  description: 'Real-world system design case studies from companies like Twitter/X.',
}

export default function CompaniesPage() {
  const companies = getAllCompanies()
  return <CompaniesContent companies={companies} />
}
