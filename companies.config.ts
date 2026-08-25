export interface CompanyMeta {
  name: string
  description: string
  brandColor: string
  logoMark: string
  tagline: string
  featuredTopics: string[]
  highlightSlugs: string[]
}

export const companiesMeta: Record<string, CompanyMeta> = {
  twitter: {
    name: 'Twitter',
    description:
      'How Twitter/X built systems at scale — timelines, search, storage, load balancing, ID generation, and full system design.',
    brandColor: '#000000',
    logoMark: '𝕏',
    tagline: 'Engineering at scale',
    featuredTopics: ['Timelines', 'Search', 'Storage', 'Load Balancing', 'ID Generation'],
    highlightSlugs: [
      'twitter-system-design',
      'timelines-at-scale',
      'manhattan-twitter-distributed-database',
    ],
  },
}
