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
  'fan-out-on-write-and-fan-out-on-read': {
    title: 'Fan-Out on Write vs Fan-Out on Read',
    date: '2026-08-26',
    description:
      'When someone posts, do you push the update into every follower feed (fan-out on write) or assemble the feed when they open the app (fan-out on read)? Same idea as Twitter timelines — write is fast to read, read is cheaper to write.',
    tags: ['system-design'],
    readTime: 2,
  },
  'cache-stampede-thundering-herd': {
    title: 'Cache Stampede / Thundering Herd',
    date: '2026-08-26',
    description:
      'When a hot cache key expires, thousands of requests miss at once and stampede the database. One request should rebuild the cache (often with a lock); the rest wait or keep serving stale data.',
    tags: ['system-design'],
    readTime: 2,
  },
  'circuit-breaker': {
    title: 'Circuit Breaker',
    date: '2026-08-26',
    description:
      'Stop calling a failing dependency. Closed is normal traffic, Open fails fast with no calls, Half-Open lets a few requests through to see if the service recovered — Resilience4j, PyBreaker, gobreaker.',
    tags: ['system-design'],
    readTime: 2,
  },
  'transactional-outbox-pattern': {
    title: 'Transactional Outbox Pattern',
    date: '2026-08-26',
    description:
      'Write the business row and an outbox event in the same database transaction, then a worker publishes pending events to Kafka. That way payment and analytics never miss an order that already committed.',
    tags: ['system-design'],
    readTime: 2,
  },
  'hot-key-problem': {
    title: 'Hot Key Problem',
    date: '2026-08-26',
    description:
      'A clustered cache can shard keys evenly and still melt one node when one key is a celebrity — like India–Pakistan cricket score. Copy that hot key onto other caches so the reads spread out.',
    tags: ['system-design'],
    readTime: 2,
  },
  'load-shedding': {
    title: 'Load Shedding',
    date: '2026-08-30',
    description:
      'When 30k req/s hit a box that can only do 10k, extra servers take time and the database may not scale with you. Drop the overflow — keep checkout and payment, shed recommendations — via concurrency limits, bounded queues, health checks, or priority.',
    tags: ['system-design'],
    readTime: 2,
  },
  'retry-exponential-bacoff-jitter': {
    title: 'Retry + Exponential Backoff + Jitter',
    date: '2026-08-30',
    description:
      'Retrying is not enough: 10,000 clients waiting 1s then 5s then 10s retry in lockstep and stampede the dependency again. Exponential backoff spaces attempts; jitter (1.2s, 5.5s, 10.1s) desynchronizes them.',
    tags: ['system-design'],
    readTime: 2,
  },
}
