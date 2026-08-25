import fs from 'fs'
import path from 'path'

interface DiagramTextElement {
  type?: string
  isDeleted?: boolean
  text?: string
  originalText?: string
}

const MAX_CHARS = 2500
const MAX_SNIPPETS = 24

export function extractDiagramText(diagramPath: string): string[] {
  const relative = decodeURIComponent(diagramPath.replace(/^\//, ''))
  const filePath = path.join(process.cwd(), 'public', relative)
  if (!fs.existsSync(filePath)) return []

  try {
    const raw = fs.readFileSync(filePath, 'utf8')
    const json = JSON.parse(raw) as { elements?: DiagramTextElement[] }
    const seen = new Set<string>()
    const snippets: string[] = []
    let total = 0

    for (const el of json.elements ?? []) {
      if (el.isDeleted || el.type !== 'text') continue
      const text = (el.originalText || el.text || '').replace(/\s+/g, ' ').trim()
      if (text.length < 12) continue
      const key = text.toLowerCase()
      if (seen.has(key)) continue
      seen.add(key)
      snippets.push(text)
      total += text.length
      if (snippets.length >= MAX_SNIPPETS || total >= MAX_CHARS) break
    }

    return snippets
  } catch {
    return []
  }
}
