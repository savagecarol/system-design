import type { Metadata } from 'next'
import { getAllApps } from '@/lib/apps'
import { AppsContent } from './AppsContent'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Apps',
  description:
    'Apps from DesigningSystems.dev — product pages, privacy policies, and instructions for rebuilding them.',
  path: '/app',
  ogImageAlt: 'Apps on DesigningSystems.dev',
})

export default function AppsPage() {
  const apps = getAllApps()
  return <AppsContent apps={apps} />
}
