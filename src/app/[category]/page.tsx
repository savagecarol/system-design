import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getCategoryBySlug, getChaptersByCategory } from '@/lib/content'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { JsonLd } from '@/components/seo/JsonLd'
import { DifficultyBadge } from '@/components/ui/DifficultyBadge'
import { breadcrumbJsonLd, pageMetadata } from '@/lib/seo'
import { absUrl } from '@/lib/site'

interface PageProps {
  params: {
    category: string
  }
}

export async function generateStaticParams() {
  return getChaptersByCategory().map(group => ({ category: group.categorySlug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const group = getCategoryBySlug(params.category)
  if (!group) return {}

  const description = `System design chapters on ${group.category.toLowerCase()} — ${group.chapters.length} interactive lessons with diagrams.`
  return pageMetadata({
    title: `${group.category} — System Design Chapters`,
    description,
    path: `/${group.categorySlug}`,
    ogImageAlt: `${group.category} system design chapters`,
  })
}

export default function CategoryPage({ params }: PageProps) {
  const group = getCategoryBySlug(params.category)
  if (!group) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        name: `${group.category} — System Design`,
        description: `Chapters covering ${group.category.toLowerCase()} for system design interviews.`,
        url: absUrl(`/${group.categorySlug}`),
      },
      breadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: group.category, path: `/${group.categorySlug}` },
      ]),
    ],
  }

  return (
    <div className="min-h-screen bg-canvas">
      <JsonLd data={jsonLd} />
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 pt-24 pb-16">
        <Link
          href="/#chapters"
          className="inline-flex items-center gap-1 text-xs font-mono text-muted hover:text-brand-600 transition-colors mb-4"
        >
          All chapters
        </Link>
        <h1 className="text-4xl font-bold text-gray-900 mb-3 tracking-tight">{group.category}</h1>
        <p className="text-muted text-base mb-10">
          {group.chapters.length} chapters on {group.category.toLowerCase()} for system design interviews.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {group.chapters.map(chapter => (
            <Link
              key={chapter.fullSlug}
              href={`/${chapter.categorySlug}/${chapter.slug}`}
              className="group block p-5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 hover:border-brand-500/50 transition-colors"
            >
              <div className="flex items-start justify-between gap-2 mb-3">
                <h2 className="font-semibold text-gray-900 group-hover:text-brand-600 transition-colors leading-tight">
                  {chapter.title}
                </h2>
                <DifficultyBadge difficulty={chapter.difficulty} />
              </div>
              {chapter.description && (
                <p className="text-sm text-muted line-clamp-2 mb-3">{chapter.description}</p>
              )}
              <p className="text-xs text-muted font-mono">{chapter.readTime} min read</p>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
