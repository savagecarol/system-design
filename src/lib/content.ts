import fs from 'fs'
import path from 'path'
import { chapterMeta, defaultMeta } from '../../chapters.config'
import { canonicalChapterFullSlug } from './slug-aliases'

export interface Chapter {
  categoryOrder: number
  category: string
  categorySlug: string
  chapterOrder: number
  title: string
  slug: string
  fullSlug: string
  fileSlug: string
  diagramPath: string
  difficulty: string
  readTime: number
  description: string
}

export interface CategoryGroup {
  category: string
  categorySlug: string
  categoryOrder: number
  chapters: Chapter[]
}

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}

function toTitle(name: string): string {
  return name
    .split(/[\s-]+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

function parseFolder(folderName: string): { order: number; category: string; categorySlug: string } {
  const dotIndex = folderName.indexOf('.')
  if (dotIndex === -1) {
    return { order: 0, category: toTitle(folderName), categorySlug: toSlug(folderName) }
  }
  const order = parseInt(folderName.slice(0, dotIndex), 10)
  const rawName = folderName.slice(dotIndex + 1).trim()
  return {
    order,
    category: toTitle(rawName),
    categorySlug: toSlug(rawName),
  }
}

function parseFile(fileName: string): { order: number; title: string; slug: string } | null {
  if (!fileName.endsWith('.excalidraw')) return null
  // Handle double extension like .excalidraw.excalidraw
  const withoutExt = fileName.replace(/\.excalidraw(\.excalidraw)?$/, '')
  const dotIndex = withoutExt.indexOf('.')
  if (dotIndex === -1) {
    return { order: 0, title: toTitle(withoutExt), slug: toSlug(withoutExt) }
  }
  const order = parseInt(withoutExt.slice(0, dotIndex), 10)
  const rawName = withoutExt.slice(dotIndex + 1).trim()
  return {
    order,
    title: toTitle(rawName),
    slug: toSlug(rawName),
  }
}

function getAllChaptersFromPublicDiagrams(): Chapter[] {
  const publicDiagramsDir = path.join(process.cwd(), 'public', 'diagrams')
  if (!fs.existsSync(publicDiagramsDir)) return []

  // Derive category and chapter ordering from chapters.config.ts key order
  const configKeys = Object.keys(chapterMeta)
  const categoryOrder = new Map<string, number>()
  const chapterOrderMap = new Map<string, number>()
  let catIdx = 0
  for (const key of configKeys) {
    const catSlug = key.split('/')[0]
    if (!categoryOrder.has(catSlug)) categoryOrder.set(catSlug, catIdx++)
    chapterOrderMap.set(key, chapterOrderMap.size)
  }

  const chapters: Chapter[] = []
  const folders = fs.readdirSync(publicDiagramsDir, { withFileTypes: true }).filter(d => d.isDirectory())

  for (const folder of folders) {
    const categorySlug = folder.name
    const category = toTitle(categorySlug.replace(/-/g, ' '))
    const catOrder = categoryOrder.get(categorySlug) ?? 99
    const folderPath = path.join(publicDiagramsDir, folder.name)
    const files = fs.readdirSync(folderPath, { withFileTypes: true })
      .filter(f => f.isFile() && f.name.endsWith('.excalidraw'))

    for (const file of files) {
      const fileSlug = file.name.replace('.excalidraw', '')
      const fullSlug = canonicalChapterFullSlug(categorySlug, fileSlug)
      const slug = fullSlug.slice(categorySlug.length + 1)
      const meta = chapterMeta[fullSlug] ?? chapterMeta[`${categorySlug}/${fileSlug}`] ?? defaultMeta
      chapters.push({
        categoryOrder: catOrder,
        category,
        categorySlug,
        chapterOrder: chapterOrderMap.get(fullSlug) ?? chapterOrderMap.get(`${categorySlug}/${fileSlug}`) ?? 99,
        title: meta.title || toTitle(slug.replace(/-/g, ' ')),
        slug,
        fullSlug,
        fileSlug,
        diagramPath: `/diagrams/${categorySlug}/${fileSlug}.excalidraw`,
        difficulty: meta.difficulty,
        readTime: meta.readTime,
        description: meta.description,
      })
    }
  }

  return chapters
}

export function getAllChapters(): Chapter[] {
  const filesDir = path.join(process.cwd(), '..', 'files')

  if (!fs.existsSync(filesDir)) {
    return getAllChaptersFromPublicDiagrams()
  }

  const chapters: Chapter[] = []

  const folders = fs.readdirSync(filesDir, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .sort((a, b) => a.name.localeCompare(b.name))

  for (const folder of folders) {
    const { order: categoryOrder, category, categorySlug } = parseFolder(folder.name)
    const folderPath = path.join(filesDir, folder.name)

    const files = fs.readdirSync(folderPath, { withFileTypes: true })
      .filter(f => f.isFile() && f.name.endsWith('.excalidraw'))
      .sort((a, b) => a.name.localeCompare(b.name))

    for (const file of files) {
      const parsed = parseFile(file.name)
      if (!parsed) continue

      const fullSlug = canonicalChapterFullSlug(categorySlug, parsed.slug)
      const slug = fullSlug.slice(categorySlug.length + 1)
      const meta = chapterMeta[fullSlug] ?? chapterMeta[`${categorySlug}/${parsed.slug}`] ?? defaultMeta

      chapters.push({
        categoryOrder,
        category,
        categorySlug,
        chapterOrder: parsed.order,
        title: meta.title || parsed.title,
        slug,
        fullSlug,
        fileSlug: parsed.slug,
        diagramPath: `/diagrams/${categorySlug}/${parsed.slug}.excalidraw`,
        difficulty: meta.difficulty,
        readTime: meta.readTime,
        description: meta.description,
      })
    }
  }

  return chapters
}

export function getChapterBySlug(categorySlug: string, chapterSlug: string): Chapter | undefined {
  const chapters = getAllChapters()
  return chapters.find(c => c.categorySlug === categorySlug && c.slug === chapterSlug)
}

export function getChaptersByCategory(): CategoryGroup[] {
  const chapters = getAllChapters()
  const groups: Map<string, CategoryGroup> = new Map()

  for (const chapter of chapters) {
    if (!groups.has(chapter.categorySlug)) {
      groups.set(chapter.categorySlug, {
        category: chapter.category,
        categorySlug: chapter.categorySlug,
        categoryOrder: chapter.categoryOrder,
        chapters: [],
      })
    }
    groups.get(chapter.categorySlug)!.chapters.push(chapter)
  }

  // Sort each category's chapters
  const groupArray = Array.from(groups.values())
  for (const group of groupArray) {
    group.chapters.sort((a: Chapter, b: Chapter) => a.chapterOrder - b.chapterOrder)
  }

  return groupArray.sort((a: CategoryGroup, b: CategoryGroup) => a.categoryOrder - b.categoryOrder)
}

export function getCategoryBySlug(categorySlug: string): CategoryGroup | undefined {
  return getChaptersByCategory().find(group => group.categorySlug === categorySlug)
}

export function getPrevNextChapters(fullSlug: string): { prev: Chapter | null; next: Chapter | null } {
  const chapters = getAllChapters()
  // Sort all chapters by category order then chapter order
  const sorted = chapters.sort((a, b) => {
    if (a.categoryOrder !== b.categoryOrder) return a.categoryOrder - b.categoryOrder
    return a.chapterOrder - b.chapterOrder
  })

  const index = sorted.findIndex(c => c.fullSlug === fullSlug)
  if (index === -1) return { prev: null, next: null }

  return {
    prev: index > 0 ? sorted[index - 1] : null,
    next: index < sorted.length - 1 ? sorted[index + 1] : null,
  }
}
