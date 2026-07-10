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
    description: 'they both are messaging patterns used in decoupled service. queues are used to assign work and pub/sub is used to broadcast messages to multiple subscribers.',
    tags: ['system-design'],
    readTime: 2,
  }

}
