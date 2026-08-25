import { relatedLinks, type RelatedLink } from '../../related.config'

export function getRelatedLinks(key: string): RelatedLink[] {
  return relatedLinks[key] ?? []
}

export function getChapterRelatedLinks(categorySlug: string, chapterSlug: string): RelatedLink[] {
  return getRelatedLinks(`${categorySlug}/${chapterSlug}`)
}

export function getCompanyRelatedLinks(companySlug: string, postSlug: string): RelatedLink[] {
  return getRelatedLinks(`companies/${companySlug}/${postSlug}`)
}

export function getBlogRelatedLinks(slug: string): RelatedLink[] {
  return getRelatedLinks(`blog/${slug}`)
}
