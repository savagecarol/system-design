export interface CompanyMeta {
  name: string
  description: string
}

export const companiesMeta: Record<string, CompanyMeta> = {
  twitter: {
    name: 'Twitter',
    description:
      'How Twitter/X built systems at scale — timelines, search, storage, load balancing, ID generation, and full system design.',
  },
}
