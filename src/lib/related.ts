import { relatedLinks, type RelatedLink } from '../../related.config'
import { getPrevNextChapters } from './content'

export function getRelatedLinks(key: string): RelatedLink[] {
  return relatedLinks[key] ?? []
}

export function getChapterRelatedLinks(categorySlug: string, chapterSlug: string): RelatedLink[] {
  const configured = [...getRelatedLinks(`${categorySlug}/${chapterSlug}`)]
  const seen = new Set(configured.map(link => link.href))
  const { prev, next } = getPrevNextChapters(`${categorySlug}/${chapterSlug}`)

  for (const chapter of [prev, next]) {
    if (!chapter) continue
    const href = `/${chapter.categorySlug}/${chapter.slug}`
    if (seen.has(href)) continue
    configured.push({ href, label: chapter.title, type: 'chapter' })
    seen.add(href)
  }

  return configured.slice(0, 6)
}

export function getCompanyRelatedLinks(companySlug: string, postSlug: string): RelatedLink[] {
  return getRelatedLinks(`companies/${companySlug}/${postSlug}`)
}

export function getBlogRelatedLinks(slug: string): RelatedLink[] {
  return getRelatedLinks(`blog/${slug}`)
}
