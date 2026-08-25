export interface CompanyPostMeta {
  title: string
  date: string
  description: string
  tags: string[]
  readTime: number
}

export const defaultCompanyPostMeta: CompanyPostMeta = {
  title: '',
  date: '',
  description: '',
  tags: [],
  readTime: 5,
}

export const companyPostMeta: Record<string, CompanyPostMeta> = {
  'timelines-at-scale': {
    title: 'Timelines at Scale',
    date: '2026-07-24',
    description:
      'How Twitter built a scalable timeline service — from fanout on write vs read, to the hybrid approach Raffi Krikorian led that powers hundreds of millions of users.',
    tags: ['system-design'],
    readTime: 5,
  },
  'snow-flake': {
    title: 'Snowflake — Unique ID Generator',
    date: '2026-08-12',
    description:
      "How Twitter's Snowflake generates unique, sortable 64-bit IDs at scale — breaking down the epoch, datacenter, machine, and sequence bits.",
    tags: ['system-design'],
    readTime: 4,
  },
  'manhattan-twitter-distributed-database': {
    title: 'Manhattan — Twitter Distributed Database',
    date: '2026-08-12',
    description:
      "How Twitter built Manhattan, its distributed storage system — sharding, replication, replica repair, and why existing databases did not meet Twitter's latency and operational requirements.",
    tags: ['system-design'],
    readTime: 6,
  },
  'daperture-twitter-load-balancer': {
    title: 'Daperture — Twitter Load Balancer',
    date: '2026-08-12',
    description:
      'How Twitter built Daperture (Deterministic Aperture) — an internal load-balancing algorithm combining deterministic server subsets with Power of Two Choices to distribute traffic at scale.',
    tags: ['system-design'],
    readTime: 5,
  },
  'earlybird-twitter-seach-engine': {
    title: 'Earlybird — Twitter Search Engine',
    date: '2026-08-17',
    description:
      'How Twitter built Earlybird, its custom real-time distributed search engine — from MySQL LIKE queries to inverted indexes, Lucene, and a distributed Lucene index tuned for tweet search at scale.',
    tags: ['system-design'],
    readTime: 7,
  },
  'twitter-system-design': {
    title: 'Twitter (X) System Design',
    date: '2026-08-17',
    description:
      'End-to-end Twitter system design — functional and non-functional requirements, load balancer, API gateway, tweet/timeline/search services, Manhattan, CDN, cache, and rate limiting.',
    tags: ['system-design'],
    readTime: 8,
  },
}
