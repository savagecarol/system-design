import type { MetadataRoute } from 'next'
import { getAllChapters, getChaptersByCategory } from '@/lib/content'
import { getAllBlogPosts } from '@/lib/blogs'
import { getAllCompanies, getCompanyPosts } from '@/lib/companies'
import { SITE_URL } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = ['/', '/about', '/blog', '/companies'].map(path => ({
    url: `${SITE_URL}${path === '/' ? '' : path}`,
    lastModified: now,
    changeFrequency: path === '/' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : 0.7,
  }))

  const categories = getChaptersByCategory().map(group => ({
    url: `${SITE_URL}/${group.categorySlug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const chapters = getAllChapters().map(chapter => ({
    url: `${SITE_URL}/${chapter.categorySlug}/${chapter.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }))

  const posts = getAllBlogPosts().map(post => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const companies = getAllCompanies()
  const companyPages = companies.flatMap(company => [
    {
      url: `${SITE_URL}/companies/${company.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    ...getCompanyPosts(company.slug).map(post => ({
      url: `${SITE_URL}/companies/${company.slug}/${post.slug}`,
      lastModified: post.date ? new Date(post.date) : now,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    })),
  ])

  return [...staticRoutes, ...categories, ...chapters, ...posts, ...companyPages]
}
