import type { Metadata } from 'next'
import { getAllBlogPosts } from '@/lib/blogs'
import { BlogContent } from './BlogContent'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Articles and deep-dives on system design topics.',
}

export default function BlogPage() {
  const posts = getAllBlogPosts()
  return <BlogContent posts={posts} />
}
