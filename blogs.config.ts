export interface BlogMeta {
  title: string
  date: string
  description: string
  tags: string[]
  companies: string[]
  readTime: number
}

export const defaultBlogMeta: BlogMeta = {
  title: '',
  date: '',
  description: '',
  tags: [],
  companies: [],
  readTime: 5,
}

export const blogMeta: Record<string, BlogMeta> = {
  'message-queue-vs-pub-sub': {
    title: 'Messaging Queue Vs Pub/Sub',
    date: '2026-07-10',
    description: 'they both are messaging patterns used in decoupled service. queues are used to assign work and pub/sub is used to broadcast messages to multiple subscribers.',
    tags: ['system-design'],
    companies: [],
    readTime: 2,
  },
  'bloom-filters': {
    title: 'Bloom Filters',
    date: '2026-07-10',
    description: 'A Bloom filter is a space-efficient probabilistic data structure that is used to test whether an element is a member of a set.',
    tags: ['system-design'],
    companies: [],
    readTime: 2,
  },
  'timelines-at-scale': {
    title: 'Timelines at Scale',
    date: '2026-07-24',
    description: 'How Twitter built a scalable timeline service — from fanout on write vs read, to the hybrid approach Raffi Krikorian led that powers hundreds of millions of users.',
    tags: ['system-design'],
    companies: ['Twitter'],
    readTime: 5,
  },
  'snow-flake': {
    title: 'Snowflake — Unique ID Generator',
    date: '2026-08-12',
    description: 'How Twitter\'s Snowflake generates unique, sortable 64-bit IDs at scale — breaking down the epoch, datacenter, machine, and sequence bits.',
    tags: ['system-design'],
    companies: ['Twitter'],
    readTime: 4,
  },
  'manhattan-twitter-distributed-database': {
    title: 'Manhattan — Twitter Distributed Database',
    date: '2026-08-12',
    description: 'How Twitter built Manhattan, its distributed storage system — sharding, replication, replica repair, and why existing databases did not meet Twitter\'s latency and operational requirements.',
    tags: ['system-design'],
    companies: ['Twitter'],
    readTime: 6,
  },
  'daperture-twitter-load-balancer': {
    title: 'Daperture — Twitter Load Balancer',
    date: '2026-08-12',
    description: 'How Twitter built Daperture (Deterministic Aperture) — an internal load-balancing algorithm combining deterministic server subsets with Power of Two Choices to distribute traffic at scale.',
    tags: ['system-design'],
    companies: ['Twitter'],
    readTime: 5,
  },
  'differences-in-system-desgin-interview-topics': {
    title: 'Differences in System Design Interview Topics',
    date: '2026-08-01',
    description: 'Common "difference" questions asked in system design interviews — comparing patterns, protocols, and architectural choices side by side.',
    tags: [],
    companies: [],
    readTime: 5,
  },
}
