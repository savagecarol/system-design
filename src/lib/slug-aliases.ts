/** File-derived slug (or old URL slug) → canonical URL slug. */

export const CHAPTER_SLUG_ALIASES: Record<string, string> = {
  'scaling/load-balancer-for-hozintal-scaling': 'scaling/load-balancer-for-horizontal-scaling',
  'theorems/consensus--fault-tolerance': 'theorems/consensus-fault-tolerance',
  'database-replication/commit-types---sync-async-and-semi-sync':
    'database-replication/commit-types-sync-async-and-semi-sync',
  'database-replication/conflicts-and-conflicts-resolution-in-mutli-leader-replication':
    'database-replication/conflicts-and-conflict-resolution-in-multi-leader-replication',
}

export const BLOG_SLUG_ALIASES: Record<string, string> = {
  'differences-in-system-desgin-interview-topics': 'differences-in-system-design-interview-topics',
}

export const COMPANY_POST_SLUG_ALIASES: Record<string, string> = {
  'earlybird-twitter-seach-engine': 'earlybird-twitter-search-engine',
  'snow-flake': 'snowflake',
}

export function canonicalChapterFullSlug(categorySlug: string, fileSlug: string): string {
  const key = `${categorySlug}/${fileSlug}`
  return CHAPTER_SLUG_ALIASES[key] ?? key
}

export function canonicalBlogSlug(fileSlug: string): string {
  return BLOG_SLUG_ALIASES[fileSlug] ?? fileSlug
}

export function canonicalCompanyPostSlug(fileSlug: string): string {
  return COMPANY_POST_SLUG_ALIASES[fileSlug] ?? fileSlug
}

export function seoRedirects(): { source: string; destination: string; permanent: boolean }[] {
  const redirects: { source: string; destination: string; permanent: boolean }[] = []

  for (const [from, to] of Object.entries(CHAPTER_SLUG_ALIASES)) {
    redirects.push({ source: `/${from}`, destination: `/${to}`, permanent: true })
  }

  for (const [from, to] of Object.entries(BLOG_SLUG_ALIASES)) {
    redirects.push({ source: `/blog/${from}`, destination: `/blog/${to}`, permanent: true })
  }

  for (const [from, to] of Object.entries(COMPANY_POST_SLUG_ALIASES)) {
    redirects.push({
      source: `/companies/twitter/${from}`,
      destination: `/companies/twitter/${to}`,
      permanent: true,
    })
  }

  return redirects
}
