import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getChapterBySlug, getChaptersByCategory, getAllChapters } from '@/lib/content'
import { getChapterRelatedLinks } from '@/lib/related'
import { Navbar } from '@/components/layout/Navbar'
import { Sidebar } from '@/components/layout/Sidebar'
import { ExcalidrawViewer } from '@/components/chapter/ExcalidrawViewer'
import { ChapterPageClient } from '@/components/chapter/ChapterPageClient'
import { JsonLd } from '@/components/seo/JsonLd'
import { LessonOutline } from '@/components/seo/LessonOutline'
import { RelatedLinksBar } from '@/components/shared/RelatedLinksBar'
import { articleJsonLd, breadcrumbJsonLd, pageMetadata } from '@/lib/seo'

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

  const title = `${chapter.title} — ${chapter.category}`
  const description =
    chapter.description ||
    `Learn ${chapter.title} in the ${chapter.category} system design series on DesigningSystems.dev.`
  const path = `/${chapter.categorySlug}/${chapter.slug}`
  const ogImage = `${path}/og-image`

  return pageMetadata({
    title,
    description,
    path,
    ogImage,
    ogImageAlt: `${chapter.title} — ${chapter.category} system design`,
    type: 'article',
  })
}

export default function ChapterPage({ params }: PageProps) {
  const chapter = getChapterBySlug(params.category, params.chapter)
  if (!chapter) notFound()

  const categories = getChaptersByCategory()
  const related = getChapterRelatedLinks(params.category, params.chapter)
  const path = `/${chapter.categorySlug}/${chapter.slug}`
  const description =
    chapter.description ||
    `Learn ${chapter.title} in the ${chapter.category} system design series.`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      articleJsonLd({
        headline: chapter.title,
        description,
        path,
        image: `${path}/og-image`,
      }),
      breadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: chapter.category, path: `/${chapter.categorySlug}` },
        { name: chapter.title, path },
      ]),
    ],
  }

  return (
    <div className="h-screen flex flex-col bg-canvas overflow-hidden">
      <JsonLd data={jsonLd} />
      <Navbar currentPage={path} showMenuButton />

      <div
        className="flex overflow-hidden"
        style={{ height: 'calc(100vh - 3.5rem)', marginTop: '3.5rem' }}
      >
        <Sidebar categories={categories} activeFullSlug={chapter.fullSlug} />

        <main className="flex-1 lg:ml-64 flex flex-col overflow-hidden">
          <div className="shrink-0 flex flex-col border-b border-gray-200 bg-white/90 backdrop-blur-sm">
            <div className="h-10 flex items-center gap-2 px-4">
              <span className="text-xs font-mono text-muted">{chapter.category}</span>
              <span className="text-gray-300 text-xs">/</span>
              <h1 className="text-sm font-mono text-gray-900 truncate">{chapter.title}</h1>
            </div>
            <RelatedLinksBar links={related} />
            <LessonOutline
              title={chapter.title}
              description={description}
              diagramPath={chapter.diagramPath}
            />
          </div>

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
