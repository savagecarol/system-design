import fs from 'fs'
import path from 'path'
import { appsMeta, type AppMeta, type AppTheme } from '../../apps.config'

export type { AppMeta, AppTheme }

export interface AppRecord extends AppMeta {
  privacyMarkdown: string | null
  promptMarkdown: string | null
  instructionsMarkdown: string | null
  screenshotPaths: string[]
}

function appsRoot(): string {
  return path.join(process.cwd(), 'public', 'apps')
}

function readOptionalText(filePath: string): string | null {
  if (!fs.existsSync(filePath)) return null
  return fs.readFileSync(filePath, 'utf8')
}

function resolveScreenshots(slug: string, filenames: string[]): string[] {
  const dir = path.join(appsRoot(), slug, 'screenshots')
  return filenames
    .filter(name => fs.existsSync(path.join(dir, name)))
    .map(name => `/apps/${slug}/screenshots/${encodeURIComponent(name)}`)
}

export function getAllApps(): AppRecord[] {
  return appsMeta.map(meta => {
    const dir = path.join(appsRoot(), meta.slug)
    return {
      ...meta,
      privacyMarkdown: readOptionalText(path.join(dir, 'privacy.md')),
      promptMarkdown: readOptionalText(path.join(dir, 'prompt.md')),
      instructionsMarkdown: readOptionalText(path.join(dir, 'instructions.md')),
      screenshotPaths: resolveScreenshots(meta.slug, meta.screenshots),
    }
  })
}

export function getAppBySlug(slug: string): AppRecord | undefined {
  return getAllApps().find(app => app.slug === slug)
}
