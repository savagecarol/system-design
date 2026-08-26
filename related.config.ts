export type RelatedLinkType = 'chapter' | 'company' | 'blog'

export interface RelatedLink {
  href: string
  label: string
  type: RelatedLinkType
}

/** Key format: "companies/twitter/slug", "category/chapter-slug", or "blog/slug" */
export const relatedLinks: Record<string, RelatedLink[]> = {
  'companies/twitter/twitter-system-design': [
    { href: '/companies/twitter/manhattan-twitter-distributed-database', label: 'Manhattan', type: 'company' },
    { href: '/companies/twitter/earlybird-twitter-search-engine', label: 'Earlybird', type: 'company' },
    { href: '/companies/twitter/timelines-at-scale', label: 'Timelines at Scale', type: 'company' },
    { href: '/networking-and-edge/api-gateway', label: 'API Gateway', type: 'chapter' },
    { href: '/networking-and-edge/cdn', label: 'CDN', type: 'chapter' },
    { href: '/networking-and-edge/load-balancer', label: 'Load Balancer', type: 'chapter' },
  ],
  'companies/twitter/daperture-twitter-load-balancer': [
    { href: '/networking-and-edge/load-balancer', label: 'Load Balancer', type: 'chapter' },
    { href: '/networking-and-edge/where-to-use-what', label: 'Where to Use What', type: 'chapter' },
    { href: '/companies/twitter/twitter-system-design', label: 'Twitter System Design', type: 'company' },
  ],
  'companies/twitter/manhattan-twitter-distributed-database': [
    { href: '/companies/twitter/twitter-system-design', label: 'Twitter System Design', type: 'company' },
    { href: '/companies/twitter/snowflake', label: 'Snowflake IDs', type: 'company' },
    { href: '/database-discussion/databases-tree', label: 'Database Types', type: 'chapter' },
  ],
  'companies/twitter/earlybird-twitter-search-engine': [
    { href: '/companies/twitter/twitter-system-design', label: 'Twitter System Design', type: 'company' },
    { href: '/blog/bloom-filters', label: 'Bloom Filters', type: 'blog' },
  ],
  'companies/twitter/timelines-at-scale': [
    { href: '/companies/twitter/twitter-system-design', label: 'Twitter System Design', type: 'company' },
    { href: '/scaling/horizontal-scaling', label: 'Horizontal Scaling', type: 'chapter' },
    { href: '/blog/fan-out-on-write-and-fan-out-on-read', label: 'Fan-Out on Write vs Read', type: 'blog' },
  ],
  'companies/twitter/snowflake': [
    { href: '/companies/twitter/twitter-system-design', label: 'Twitter System Design', type: 'company' },
    { href: '/companies/twitter/manhattan-twitter-distributed-database', label: 'Manhattan', type: 'company' },
  ],
  'networking-and-edge/proxies': [
    { href: '/networking-and-edge/load-balancer', label: 'Load Balancer', type: 'chapter' },
    { href: '/networking-and-edge/where-to-use-what', label: 'Where to Use What', type: 'chapter' },
  ],
  'networking-and-edge/load-balancer': [
    { href: '/networking-and-edge/proxies', label: 'Proxies', type: 'chapter' },
    { href: '/networking-and-edge/where-to-use-what', label: 'Where to Use What', type: 'chapter' },
    { href: '/companies/twitter/daperture-twitter-load-balancer', label: 'Daperture (Twitter)', type: 'company' },
    { href: '/scaling/load-balancer-for-horizontal-scaling', label: 'LB in Horizontal Scaling', type: 'chapter' },
  ],
  'networking-and-edge/cdn': [
    { href: '/networking-and-edge/proxies', label: 'Proxies', type: 'chapter' },
    { href: '/networking-and-edge/where-to-use-what', label: 'Where to Use What', type: 'chapter' },
    { href: '/companies/twitter/twitter-system-design', label: 'Twitter System Design', type: 'company' },
    { href: '/blog/cache-stampede-thundering-herd', label: 'Cache Stampede', type: 'blog' },
  ],
  'networking-and-edge/api-gateway': [
    { href: '/networking-and-edge/proxies', label: 'Proxies', type: 'chapter' },
    { href: '/networking-and-edge/where-to-use-what', label: 'Where to Use What', type: 'chapter' },
    { href: '/companies/twitter/twitter-system-design', label: 'Twitter System Design', type: 'company' },
    { href: '/blog/differences-in-system-design-interview-topics', label: 'LB vs API Gateway', type: 'blog' },
  ],
  'networking-and-edge/where-to-use-what': [
    { href: '/networking-and-edge/proxies', label: 'Proxies', type: 'chapter' },
    { href: '/networking-and-edge/load-balancer', label: 'Load Balancer', type: 'chapter' },
    { href: '/networking-and-edge/cdn', label: 'CDN', type: 'chapter' },
    { href: '/networking-and-edge/api-gateway', label: 'API Gateway', type: 'chapter' },
  ],
  'scaling/load-balancer-for-horizontal-scaling': [
    { href: '/networking-and-edge/load-balancer', label: 'Load Balancer Deep Dive', type: 'chapter' },
    { href: '/scaling/horizontal-scaling', label: 'Horizontal Scaling', type: 'chapter' },
  ],
  'blog/differences-in-system-design-interview-topics': [
    { href: '/networking-and-edge/where-to-use-what', label: 'Where to Use What', type: 'chapter' },
    { href: '/networking-and-edge/api-gateway', label: 'API Gateway', type: 'chapter' },
    { href: '/networking-and-edge/load-balancer', label: 'Load Balancer', type: 'chapter' },
  ],
  'blog/bloom-filters': [
    { href: '/companies/twitter/earlybird-twitter-search-engine', label: 'Earlybird (Twitter)', type: 'company' },
  ],
  'blog/message-queue-vs-pub-sub': [
    { href: '/architecture-patterns/event-driven', label: 'Event-Driven Architecture', type: 'chapter' },
  ],
  'blog/presigned-url-and-multi-part-upload': [
    { href: '/networking-and-edge/cdn', label: 'CDN', type: 'chapter' },
    { href: '/networking-and-edge/proxies', label: 'Proxies', type: 'chapter' },
    { href: '/capacity-estimation/calculations', label: 'Capacity Calculations', type: 'chapter' },
  ],
  'blog/fan-out-on-write-and-fan-out-on-read': [
    { href: '/companies/twitter/timelines-at-scale', label: 'Timelines at Scale', type: 'company' },
    { href: '/architecture-patterns/event-driven', label: 'Event-Driven Architecture', type: 'chapter' },
    { href: '/blog/message-queue-vs-pub-sub', label: 'Queue vs Pub/Sub', type: 'blog' },
  ],
  'blog/cache-stampede-thundering-herd': [
    { href: '/networking-and-edge/cdn', label: 'CDN', type: 'chapter' },
    { href: '/blog/bloom-filters', label: 'Bloom Filters', type: 'blog' },
    { href: '/scaling/auto-scaling', label: 'Auto Scaling', type: 'chapter' },
  ],
}
