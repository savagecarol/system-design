#!/usr/bin/env tsx
import fs from 'fs'
import path from 'path'

const WEBSITE_DIR = path.join(__dirname, '..')
const FILES_DIR = path.join(WEBSITE_DIR, '..', 'files')
const PUBLIC_DIAGRAMS_DIR = path.join(WEBSITE_DIR, 'public', 'diagrams')

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}

function parseFolder(folderName: string): { categorySlug: string } {
  const dotIndex = folderName.indexOf('.')
  if (dotIndex === -1) {
    return { categorySlug: toSlug(folderName) }
  }
  const rawName = folderName.slice(dotIndex + 1).trim()
  return { categorySlug: toSlug(rawName) }
}

function parseFile(fileName: string): { chapterSlug: string } | null {
  if (!fileName.endsWith('.excalidraw')) return null
  // Handle double extension .excalidraw.excalidraw
  const withoutExt = fileName.replace(/\.excalidraw(\.excalidraw)?$/, '')
  const dotIndex = withoutExt.indexOf('.')
  if (dotIndex === -1) {
    return { chapterSlug: toSlug(withoutExt) }
  }
  const rawName = withoutExt.slice(dotIndex + 1).trim()
  return { chapterSlug: toSlug(rawName) }
}

async function main() {
  if (!fs.existsSync(FILES_DIR)) {
    console.log('Files directory not found, skipping diagram copy:', FILES_DIR)
    return
  }

  // Ensure public/diagrams exists
  fs.mkdirSync(PUBLIC_DIAGRAMS_DIR, { recursive: true })

  const folders = fs.readdirSync(FILES_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory())

  let totalCopied = 0
  let totalSkipped = 0

  for (const folder of folders) {
    const { categorySlug } = parseFolder(folder.name)
    const folderPath = path.join(FILES_DIR, folder.name)
    const destFolderPath = path.join(PUBLIC_DIAGRAMS_DIR, categorySlug)

    fs.mkdirSync(destFolderPath, { recursive: true })

    const files = fs.readdirSync(folderPath, { withFileTypes: true })
      .filter(f => f.isFile() && f.name.endsWith('.excalidraw'))

    for (const file of files) {
      const parsed = parseFile(file.name)
      if (!parsed) {
        totalSkipped++
        continue
      }

      const srcPath = path.join(folderPath, file.name)
      const destPath = path.join(destFolderPath, `${parsed.chapterSlug}.excalidraw`)

      fs.copyFileSync(srcPath, destPath)
      console.log(`Copied: ${categorySlug}/${parsed.chapterSlug}.excalidraw`)
      totalCopied++
    }
  }

  console.log(`\nDone! Copied ${totalCopied} diagrams, skipped ${totalSkipped}.`)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
