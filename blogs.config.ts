export interface BlogMeta {
  title: string
  date: string
  description: string
  tags: string[]
  readTime: number
}

export const defaultBlogMeta: BlogMeta = {
  title: '',
  date: '',
  description: '',
  tags: [],
  readTime: 5,
}

export const blogMeta: Record<string, BlogMeta> = {
  'message-queue-vs-pub-sub': {
    title: 'Messaging Queue Vs Pub/Sub',
    date: '2026-07-10',
    description:
      'they both are messaging patterns used in decoupled service. queues are used to assign work and pub/sub is used to broadcast messages to multiple subscribers.',
    tags: ['system-design'],
    readTime: 2,
  },
  'bloom-filters': {
    title: 'Bloom Filters',
    date: '2026-07-10',
    description:
      'A Bloom filter is a space-efficient probabilistic data structure that is used to test whether an element is a member of a set.',
    tags: ['system-design'],
    readTime: 2,
  },
  'differences-in-system-desgin-interview-topics': {
    title: 'Differences in System Design Interview Topics',
    date: '2026-08-01',
    description:
      'Common "difference" questions asked in system design interviews — comparing patterns, protocols, and architectural choices side by side.',
    tags: [],
    readTime: 5,
  },
}
