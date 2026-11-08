import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getAllApps, getAppBySlug } from '@/lib/apps'
import { AppHomeContent } from './AppHomeContent'
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
    title: `${app.name} — App`,
    description: app.description,
    path: `/app/${app.slug}`,
    ogImageAlt: app.name,
  })
}

export default function AppHomePage({ params }: PageProps) {
  const app = getAppBySlug(params.slug)
  if (!app) notFound()
  return <AppHomeContent app={app} />
}
