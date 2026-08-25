export const SITE_URL = (process.env.SITE_URL ?? 'https://designingsystems.dev').replace(/\/$/, '')
export const SITE_NAME = 'DesigningSystems.dev'
export const SITE_DESCRIPTION =
  'Master system design concepts through interactive Excalidraw diagrams. Topics include scaling, databases, architecture patterns, and more.'

export function absUrl(path: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${SITE_URL}${normalized}`
}
