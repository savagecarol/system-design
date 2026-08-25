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
      'Both are messaging patterns for decoupled services. Queues assign work to one consumer; pub/sub broadcasts the same message to many subscribers.',
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
  'differences-in-system-design-interview-topics': {
    title: 'Differences in System Design Interview Topics',
    date: '2026-08-01',
    description:
      'Common "difference" questions asked in system design interviews — comparing patterns, protocols, and architectural choices side by side.',
    tags: [],
    readTime: 5,
  },
  'presigned-url-and-multi-part-upload': {
    title: 'Presigned URL and Multi-Part Upload',
    date: '2026-08-25',
    description:
      'How to upload large files (like a 2GB video) without sending them through your backend twice — pre-signed URLs offload the transfer to S3, and multi-part upload retries only failed chunks.',
    tags: ['system-design'],
    readTime: 2,
  },
}
