import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllCompanies, getCompanyBySlug, getCompanyPost, getCompanyPosts } from '@/lib/companies'
import { Navbar } from '@/components/layout/Navbar'
import { ExcalidrawViewer } from '@/components/chapter/ExcalidrawViewer'

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
  const post = getCompanyPost(params.company, params.slug)
  if (!post) return {}

  const ogImage = `/companies/${params.company}/${params.slug}/og-image`

  return {
    title: post.title,
    description: post.description || `Read ${post.title} on DesigningSystems.dev`,
    openGraph: {
      title: post.title,
      description: post.description || `Read ${post.title} on DesigningSystems.dev`,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description || `Read ${post.title} on DesigningSystems.dev`,
      images: [ogImage],
    },
  }
}

export default function CompanyPostPage({ params }: PageProps) {
  const company = getCompanyBySlug(params.company)
  const post = getCompanyPost(params.company, params.slug)
  if (!company || !post) notFound()

  return (
    <div className="h-screen flex flex-col bg-canvas overflow-hidden">
      <Navbar currentPage={`/companies/${company.slug}/${post.slug}`} />

      <div
        className="flex flex-col overflow-hidden"
        style={{ height: 'calc(100vh - 3.5rem)', marginTop: '3.5rem' }}
      >
        <div className="shrink-0 h-10 flex items-center gap-3 px-4 border-b border-gray-200 bg-white/90 backdrop-blur-sm">
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

        <div className="flex-1 relative overflow-hidden bg-[#f8fafc]">
          <div className="absolute inset-0">
            <ExcalidrawViewer diagramPath={post.diagramPath} title={post.title} />
          </div>
        </div>
      </div>
    </div>
  )
}
