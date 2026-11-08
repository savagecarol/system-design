import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getAllApps, getAppBySlug } from '@/lib/apps'
import { renderMarkdown } from '@/lib/markdown'
import { PrivacyContent } from './PrivacyContent'
import { pageMetadata } from '@/lib/seo'

interface PageProps {
  params: { slug: string }
}

export function generateStaticParams() {
  return getAllApps().map(app => ({ slug: app.slug }))
}

export function generateMetadata({ params }: PageProps): Metadata {
  const app = getAppBySlug(params.slug)
  if (!app) return {}
  return pageMetadata({
    title: `${app.name} Privacy Policy`,
    description: `Privacy policy for ${app.name}.`,
    path: `/app/${app.slug}/privacy`,
    ogImageAlt: `${app.name} privacy policy`,
  })
}

export default function AppPrivacyPage({ params }: PageProps) {
  const app = getAppBySlug(params.slug)
  if (!app?.privacyMarkdown) notFound()
  const html = renderMarkdown(app.privacyMarkdown)
  return <PrivacyContent app={app} html={html} />
}
