import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getAllCompanies, getCompanyBySlug, getCompanyPosts } from '@/lib/companies'
import { CompanyPostsContent } from './CompanyPostsContent'
import { pageMetadata } from '@/lib/seo'

interface PageProps {
  params: {
    company: string
  }
}

export async function generateStaticParams() {
  const companies = getAllCompanies()
  return companies.map(c => ({ company: c.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const company = getCompanyBySlug(params.company)
  if (!company) return {}

  return pageMetadata({
    title: `${company.name} — System Design Case Studies`,
    description: company.description,
    path: `/companies/${company.slug}`,
    ogImageAlt: `${company.name} system design case studies`,
  })
}

export default function CompanyPage({ params }: PageProps) {
  const company = getCompanyBySlug(params.company)
  if (!company) notFound()

  const posts = getCompanyPosts(params.company)
  return <CompanyPostsContent company={company} posts={posts} />
}
