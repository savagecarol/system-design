import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumbJsonLd, pageMetadata } from '@/lib/seo'
import { SITE_NAME } from '@/lib/site'

export const metadata: Metadata = pageMetadata({
  title: `About ${SITE_NAME}`,
  description:
    'DesigningSystems.dev teaches system design with interactive diagrams — chapters, company case studies, and interview-focused deep dives.',
  path: '/about',
  ogImageAlt: `About ${SITE_NAME}`,
})

export default function AboutPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      breadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
      ]),
    ],
  }

  return (
    <div className="min-h-screen bg-canvas">
      <JsonLd data={jsonLd} />
      <Navbar currentPage="/about" />
      <main className="max-w-2xl mx-auto px-4 pt-24 pb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">About</h1>
        <div className="space-y-4 text-gray-700 leading-relaxed">
          <p>
            {SITE_NAME} is a visual system design library. Each lesson is an interactive Excalidraw
            diagram covering scaling, databases, consistency, networking, and architecture patterns.
          </p>
          <p>
            The site also includes company case studies — how teams at Twitter/X built timelines,
            search, storage, and load balancing — plus shorter blog posts on interview topics.
          </p>
          <p>
            New chapters are published regularly. Subscribe from the footer, or watch walkthroughs on{' '}
            <a
              href="https://youtube.com/@savagecarol"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-600 hover:underline"
            >
              YouTube
            </a>
            .
          </p>
        </div>
        <div className="mt-8 flex flex-wrap gap-3 text-sm">
          <Link href="/" className="text-brand-600 hover:underline font-mono">
            Browse chapters
          </Link>
          <Link href="/companies" className="text-brand-600 hover:underline font-mono">
            Company case studies
          </Link>
          <Link href="/blog" className="text-brand-600 hover:underline font-mono">
            Blog
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}
