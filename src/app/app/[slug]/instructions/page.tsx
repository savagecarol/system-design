import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getAllApps, getAppBySlug } from '@/lib/apps'
import { renderMarkdown } from '@/lib/markdown'
import { InstructionsContent } from './InstructionsContent'
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
    title: `Build ${app.name} — Instructions`,
    description: `How ${app.name} was built — rebuild prompt, steps, and reference images.`,
    path: `/app/${app.slug}/instructions`,
    ogImageAlt: `Build ${app.name}`,
  })
}

export default function AppInstructionsPage({ params }: PageProps) {
  const app = getAppBySlug(params.slug)
  if (!app?.promptMarkdown) notFound()

  const promptHtml = renderMarkdown(app.promptMarkdown)
  const instructionsHtml = renderMarkdown(
    app.instructionsMarkdown ?? '## Steps\n\nInstructions coming soon.'
  )

  return (
    <InstructionsContent
      app={app}
      promptHtml={promptHtml}
      instructionsHtml={instructionsHtml}
    />
  )
}
