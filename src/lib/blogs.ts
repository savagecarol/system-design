import fs from 'fs'
import path from 'path'
import { blogMeta, defaultBlogMeta } from '../../blogs.config'
import { canonicalBlogSlug } from './slug-aliases'

export interface BlogPost {
  slug: string
  title: string
  date: string
  description: string
  tags: string[]
  readTime: number
  diagramPath: string
}

function toTitle(name: string): string {
  return name
    .split(/[\s-]+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

// Converts any filename to a clean URL slug: lowercase, spaces → hyphens
function toUrlSlug(filename: string): string {
  return filename.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
}

export function getAllBlogPosts(): BlogPost[] {
  const blogsDir = path.join(process.cwd(), 'public', 'blogs')
  if (!fs.existsSync(blogsDir)) return []

  const files = fs.readdirSync(blogsDir, { withFileTypes: true })
    .filter(f => f.isFile() && f.name.endsWith('.excalidraw'))

  const posts: BlogPost[] = files.map(file => {
    const filename = file.name.replace('.excalidraw', '')  // raw, for config lookup + diagram path
    const fileSlug = toUrlSlug(filename)
    const slug = canonicalBlogSlug(fileSlug)
    const meta = blogMeta[slug] ?? blogMeta[fileSlug] ?? defaultBlogMeta
    return {
      slug,
      title: meta.title || toTitle(filename.replace(/-/g, ' ')),
      date: meta.date || '',
      description: meta.description || '',
      tags: meta.tags || [],
      readTime: meta.readTime || 5,
      diagramPath: `/blogs/${encodeURIComponent(filename)}.excalidraw`,
    }
  })

  // Sort by date descending, posts without a date go to the end
  return posts.sort((a, b) => {
    if (!a.date && !b.date) return 0
    if (!a.date) return 1
    if (!b.date) return -1
    return b.date.localeCompare(a.date)
  })
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return getAllBlogPosts().find(p => p.slug === slug)
}
