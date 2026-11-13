export interface AppTheme {
  background: string
  surface: string
  accent: string
  text: string
  muted: string
}

export interface AppMeta {
  slug: string
  name: string
  tagline: string
  description: string
  status: 'launched' | 'coming-soon'
  githubUrl: string
  playStoreUrl: string
  theme: AppTheme
  features: string[]
  screenshots: string[]
  publishedAt?: string
}

export const appsMeta: AppMeta[] = [
  {
    slug: 'dumbbell',
    name: 'Dumbbell',
    tagline: 'Free offline workout journal',
    description:
      'Log workouts, track progress, and keep training records on your device — no account or subscription. Includes ads; workout logging works offline.',
    status: 'launched',
    githubUrl: 'https://github.com/savagedevs/dumbell',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.savagecarol.dumbbell',
    theme: {
      background: '#10110F',
      surface: '#1C1E1A',
      accent: '#D5FF3F',
      text: '#F5F5EF',
      muted: '#A8ACA0',
    },
    features: [
      'Free with ads — no login or subscription',
      'Offline-first: workouts stay in private on-device storage',
      'Log sets with reps and weight in kg or lb',
      'Persistent workout timer with resume or discard',
      'History, progress charts, and body-weight tracking',
      'Exercise library with offline form cues',
      'CSV export and Backup CSV import',
      'Optional workout photo and shareable summary',
    ],
    screenshots: ['ref-01.png', 'ref-02.png', 'ref-03.png', 'ref-04.png'],
    publishedAt: '2026-11-08',
  },
]
