import fs from 'fs'
import path from 'path'
import { companiesMeta } from '../../companies.config'
import { companyPostMeta, defaultCompanyPostMeta } from '../../company-posts.config'

export interface Company {
  slug: string
  name: string
  description: string
  postCount: number
}

export interface CompanyPost {
  companySlug: string
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

function toUrlSlug(filename: string): string {
  return filename
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

export function getAllCompanies(): Company[] {
  const companiesDir = path.join(process.cwd(), 'public', 'companies')
  if (!fs.existsSync(companiesDir)) return []

  return fs
    .readdirSync(companiesDir, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => {
      const slug = d.name
      const meta = companiesMeta[slug]
      const posts = getCompanyPosts(slug)
      return {
        slug,
        name: meta?.name ?? toTitle(slug),
        description: meta?.description ?? '',
        postCount: posts.length,
      }
    })
    .sort((a, b) => a.name.localeCompare(b.name))
}

export function getCompanyBySlug(slug: string): Company | undefined {
  return getAllCompanies().find(c => c.slug === slug)
}

export function getCompanyPosts(companySlug: string): CompanyPost[] {
  const companyDir = path.join(process.cwd(), 'public', 'companies', companySlug)
  if (!fs.existsSync(companyDir)) return []

  const files = fs
    .readdirSync(companyDir, { withFileTypes: true })
    .filter(f => f.isFile() && f.name.endsWith('.excalidraw'))

  const posts: CompanyPost[] = files.map(file => {
    const filename = file.name.replace('.excalidraw', '')
    const slug = toUrlSlug(filename)
    const meta = companyPostMeta[slug] ?? defaultCompanyPostMeta
    return {
      companySlug,
      slug,
      title: meta.title || toTitle(filename.replace(/-/g, ' ')),
      date: meta.date || '',
      description: meta.description || '',
      tags: meta.tags || [],
      readTime: meta.readTime || 5,
      diagramPath: `/companies/${companySlug}/${encodeURIComponent(filename)}.excalidraw`,
    }
  })

  return posts.sort((a, b) => {
    if (!a.date && !b.date) return 0
    if (!a.date) return 1
    if (!b.date) return -1
    return b.date.localeCompare(a.date)
  })
}

export function getCompanyPost(companySlug: string, slug: string): CompanyPost | undefined {
  return getCompanyPosts(companySlug).find(p => p.slug === slug)
}
