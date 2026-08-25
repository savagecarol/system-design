import type { Metadata } from 'next'
import { SITE_NAME, absUrl } from './site'

export function pageMetadata({
  title,
  description,
  path,
  ogImage = '/opengraph-image',
  ogImageAlt,
  type = 'website',
}: {
  title: string
  description: string
  path: string
  ogImage?: string
  ogImageAlt?: string
  type?: 'website' | 'article'
}): Metadata {
  const url = absUrl(path)
  const alt = ogImageAlt ?? title

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type,
      siteName: SITE_NAME,
      url,
      title,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

export function organizationJsonLd() {
  return {
    '@type': 'Organization',
    '@id': absUrl('/#organization'),
    name: SITE_NAME,
    url: absUrl('/'),
    logo: absUrl('/icon.svg'),
  }
}

export function websiteJsonLd() {
  return {
    '@type': 'WebSite',
    '@id': absUrl('/#website'),
    name: SITE_NAME,
    url: absUrl('/'),
    publisher: { '@id': absUrl('/#organization') },
  }
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absUrl(item.path),
    })),
  }
}

export function articleJsonLd({
  headline,
  description,
  path,
  image,
  datePublished,
}: {
  headline: string
  description: string
  path: string
  image: string
  datePublished?: string
}) {
  const url = absUrl(path)
  return {
    '@type': 'Article',
    headline,
    description,
    url,
    mainEntityOfPage: url,
    image: absUrl(image),
    ...(datePublished ? { datePublished, dateModified: datePublished } : {}),
    author: organizationJsonLd(),
    publisher: { '@id': absUrl('/#organization') },
  }
}
