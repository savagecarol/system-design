import { notFound, redirect } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllBlogPosts, getBlogPostBySlug } from '@/lib/blogs'
import { getBlogRelatedLinks } from '@/lib/related'
import { legacyRedirects } from '../../../../redirects.config.mjs'
import { Navbar } from '@/components/layout/Navbar'
import { ExcalidrawViewer } from '@/components/chapter/ExcalidrawViewer'
import { RelatedLinksBar } from '@/components/shared/RelatedLinksBar'
import { JsonLd } from '@/components/seo/JsonLd'
import { LessonOutline } from '@/components/seo/LessonOutline'
import { articleJsonLd, breadcrumbJsonLd, pageMetadata } from '@/lib/seo'

interface PageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts()
  return posts.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = getBlogPostBySlug(params.slug)
  if (!post) return {}

  const description = post.description || `Read ${post.title} — a system design deep-dive on DesigningSystems.dev.`
  const path = `/blog/${post.slug}`
  return pageMetadata({
    title: `${post.title} — System Design Blog`,
    description,
    path,
    ogImage: `${path}/og-image`,
    ogImageAlt: post.title,
    type: 'article',
  })
}

export default function BlogPostPage({ params }: PageProps) {
  const legacy = legacyRedirects.find(r => r.source === `/blog/${params.slug}`)
  if (legacy) redirect(legacy.destination)

  const post = getBlogPostBySlug(params.slug)
  if (!post) notFound()

  const related = getBlogRelatedLinks(params.slug)
  const path = `/blog/${post.slug}`
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
        { name: 'Blog', path: '/blog' },
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
              href="/blog"
              className="flex items-center gap-1 text-xs font-mono text-muted hover:text-brand-600 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Blog
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
