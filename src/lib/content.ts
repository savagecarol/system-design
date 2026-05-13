import fs from 'fs'
import path from 'path'
import { chapterMeta, defaultMeta } from '../../chapters.config'

export interface Chapter {
  categoryOrder: number
  category: string
  categorySlug: string
  chapterOrder: number
  title: string
  slug: string
  fullSlug: string
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
      const chapterSlug = file.name.replace('.excalidraw', '')
      const fullSlug = `${categorySlug}/${chapterSlug}`
      const meta = chapterMeta[fullSlug] ?? defaultMeta
      chapters.push({
        categoryOrder: catOrder,
        category,
        categorySlug,
        chapterOrder: chapterOrderMap.get(fullSlug) ?? 99,
        title: toTitle(chapterSlug.replace(/-/g, ' ')),
        slug: chapterSlug,
        fullSlug,
        diagramPath: `/diagrams/${categorySlug}/${chapterSlug}.excalidraw`,
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

      const fullSlug = `${categorySlug}/${parsed.slug}`
      const meta = chapterMeta[fullSlug] ?? defaultMeta

      chapters.push({
        categoryOrder,
        category,
        categorySlug,
        chapterOrder: parsed.order,
        title: parsed.title,
        slug: parsed.slug,
        fullSlug,
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
