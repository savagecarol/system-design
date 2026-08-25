import type { Metadata } from 'next'
import { getAllBlogPosts } from '@/lib/blogs'
import { BlogContent } from './BlogContent'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'System Design Blog',
  description:
    'Articles and visual deep-dives on system design: Bloom filters, messaging patterns, and interview topic comparisons.',
  path: '/blog',
  ogImageAlt: 'System design blog on DesigningSystems.dev',
})

export default function BlogPage() {
  const posts = getAllBlogPosts()
  return <BlogContent posts={posts} />
}
