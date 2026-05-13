import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getChapterBySlug, getChaptersByCategory, getAllChapters } from '@/lib/content'
import { Navbar } from '@/components/layout/Navbar'
import { Sidebar } from '@/components/layout/Sidebar'
import { ExcalidrawViewer } from '@/components/chapter/ExcalidrawViewer'
import { ChapterPageClient } from '@/components/chapter/ChapterPageClient'
import { JsonLd } from '@/components/seo/JsonLd'

interface PageProps {
  params: {
    category: string
    chapter: string
  }
}

export async function generateStaticParams() {
  const chapters = getAllChapters()
  return chapters.map(ch => ({
    category: ch.categorySlug,
    chapter: ch.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const chapter = getChapterBySlug(params.category, params.chapter)
  if (!chapter) return {}

  return {
    title: chapter.title,
    description: chapter.description || `Learn ${chapter.title} in system design.`,
    openGraph: {
      title: chapter.title,
      description: chapter.description || `Learn ${chapter.title} in system design.`,
      images: [
        {
          url: `/${chapter.categorySlug}/${chapter.slug}/og-image`,
          width: 1200,
          height: 630,
        },
      ],
    },
  }
}

export default function ChapterPage({ params }: PageProps) {
  const chapter = getChapterBySlug(params.category, params.chapter)
  if (!chapter) notFound()

  const categories = getChaptersByCategory()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: chapter.title,
        description: chapter.description,
        publisher: {
          '@type': 'Organization',
          name: 'DesigningSystems.dev',
          url: 'https://designingsystems.dev',
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://designingsystems.dev' },
          { '@type': 'ListItem', position: 2, name: chapter.category, item: `https://designingsystems.dev/${chapter.categorySlug}` },
          { '@type': 'ListItem', position: 3, name: chapter.title },
        ],
      },
    ],
  }

  return (
    <div className="h-screen flex flex-col bg-canvas overflow-hidden">
      <JsonLd data={jsonLd} />
      <Navbar currentPage={`/${chapter.categorySlug}/${chapter.slug}`} showMenuButton />

      {/* Content area below fixed navbar, explicit height so flex-1 has a reference */}
      <div
        className="flex overflow-hidden"
        style={{ height: 'calc(100vh - 3.5rem)', marginTop: '3.5rem' }}
      >
        <Sidebar categories={categories} activeFullSlug={chapter.fullSlug} />

        <main className="flex-1 lg:ml-64 flex flex-col overflow-hidden">
          {/* Thin title bar — only text above the canvas */}
          <div className="shrink-0 h-10 flex items-center gap-2 px-4 border-b border-gray-200 bg-white/90 backdrop-blur-sm">
            <span className="text-xs font-mono text-muted">{chapter.category}</span>
            <span className="text-gray-300 text-xs">/</span>
            <h1 className="text-sm font-mono text-gray-900 truncate">{chapter.title}</h1>
          </div>

          {/* Canvas fills every remaining pixel — relative so Notes button anchors here */}
          <div className="flex-1 relative overflow-hidden bg-[#f8fafc]">
            <div className="absolute inset-0">
              <ExcalidrawViewer diagramPath={chapter.diagramPath} title={chapter.title} />
            </div>
            <ChapterPageClient chapter={chapter} />
          </div>
        </main>
      </div>
    </div>
  )
}
