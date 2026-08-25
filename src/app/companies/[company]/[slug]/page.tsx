import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllCompanies, getCompanyBySlug, getCompanyPost, getCompanyPosts } from '@/lib/companies'
import { getCompanyRelatedLinks } from '@/lib/related'
import { Navbar } from '@/components/layout/Navbar'
import { ExcalidrawViewer } from '@/components/chapter/ExcalidrawViewer'
import { RelatedLinksBar } from '@/components/shared/RelatedLinksBar'
import { JsonLd } from '@/components/seo/JsonLd'
import { LessonOutline } from '@/components/seo/LessonOutline'
import { articleJsonLd, breadcrumbJsonLd, pageMetadata } from '@/lib/seo'

interface PageProps {
  params: {
    company: string
    slug: string
  }
}

export async function generateStaticParams() {
  const companies = getAllCompanies()
  return companies.flatMap(company =>
    getCompanyPosts(company.slug).map(post => ({
      company: company.slug,
      slug: post.slug,
    }))
  )
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const company = getCompanyBySlug(params.company)
  const post = getCompanyPost(params.company, params.slug)
  if (!post) return {}

  const path = `/companies/${params.company}/${params.slug}`
  const description =
    post.description || `Read ${post.title} — a ${company?.name ?? 'company'} system design case study.`

  return pageMetadata({
    title: `${post.title} — ${company?.name ?? 'Company'} System Design`,
    description,
    path,
    ogImage: `${path}/og-image`,
    ogImageAlt: `${post.title} — ${company?.name ?? 'company'} system design`,
    type: 'article',
  })
}

export default function CompanyPostPage({ params }: PageProps) {
  const company = getCompanyBySlug(params.company)
  const post = getCompanyPost(params.company, params.slug)
  if (!company || !post) notFound()

  const related = getCompanyRelatedLinks(params.company, params.slug)
  const path = `/companies/${company.slug}/${post.slug}`
  const description = post.description || `Read ${post.title} on DesigningSystems.dev.`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      articleJsonLd({
        headline: post.title,
        description,
        path,
        image: `${path}/og-image`,
        datePublished: post.date || undefined,
      }),
      breadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: 'Companies', path: '/companies' },
        { name: company.name, path: `/companies/${company.slug}` },
        { name: post.title, path },
      ]),
    ],
  }

  return (
    <div className="h-screen flex flex-col bg-canvas overflow-hidden">
      <JsonLd data={jsonLd} />
      <Navbar currentPage={path} />

      <div
        className="flex flex-col overflow-hidden"
        style={{ height: 'calc(100vh - 3.5rem)', marginTop: '3.5rem' }}
      >
        <div className="shrink-0 flex flex-col border-b border-gray-200 bg-white/90 backdrop-blur-sm">
          <div className="h-10 flex items-center gap-3 px-4">
            <Link
              href="/companies"
              className="flex items-center gap-1 text-xs font-mono text-muted hover:text-brand-600 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Companies
            </Link>
            <span className="text-gray-300 text-xs">/</span>
            <Link
              href={`/companies/${company.slug}`}
              className="text-xs font-mono text-muted hover:text-brand-600 transition-colors"
            >
              {company.name}
            </Link>
            <span className="text-gray-300 text-xs">/</span>
            <h1 className="text-sm font-mono text-gray-900 truncate">{post.title}</h1>
            {post.date && (
              <>
                <span className="text-gray-300 text-xs hidden sm:block">·</span>
                <span className="text-xs font-mono text-muted hidden sm:block">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
              </>
            )}
          </div>
          <RelatedLinksBar links={related} />
          <LessonOutline title={post.title} description={description} diagramPath={post.diagramPath} />
        </div>

        <div className="flex-1 relative overflow-hidden bg-[#f8fafc]">
          <div className="absolute inset-0">
            <ExcalidrawViewer diagramPath={post.diagramPath} title={post.title} />
          </div>
        </div>
      </div>
    </div>
  )
}
