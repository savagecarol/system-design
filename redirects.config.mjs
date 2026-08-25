/** @type {import('./redirects.config.d.ts').LegacyRedirect[]} */
export const legacyRedirects = [
  {
    source: '/blog/timelines-at-scale',
    destination: '/companies/twitter/timelines-at-scale',
    permanent: true,
  },
  {
    source: '/blog/snow-flake',
    destination: '/companies/twitter/snowflake',
    permanent: true,
  },
  {
    source: '/blog/snowflake',
    destination: '/companies/twitter/snowflake',
    permanent: true,
  },
  {
    source: '/blog/manhattan-twitter-distributed-database',
    destination: '/companies/twitter/manhattan-twitter-distributed-database',
    permanent: true,
  },
  {
    source: '/blog/daperture-twitter-load-balancer',
    destination: '/companies/twitter/daperture-twitter-load-balancer',
    permanent: true,
  },
  {
    source: '/blog/earlybird-twitter-seach-engine',
    destination: '/companies/twitter/earlybird-twitter-search-engine',
    permanent: true,
  },
  {
    source: '/blog/earlybird-twitter-search-engine',
    destination: '/companies/twitter/earlybird-twitter-search-engine',
    permanent: true,
  },
  {
    source: '/blog/twitter-system-design',
    destination: '/companies/twitter/twitter-system-design',
    permanent: true,
  },
]

/** Typo / hyphenation URL fixes. Keep in sync with src/lib/slug-aliases.ts */
export const seoRedirects = [
  {
    source: '/scaling/load-balancer-for-hozintal-scaling',
    destination: '/scaling/load-balancer-for-horizontal-scaling',
    permanent: true,
  },
  {
    source: '/theorems/consensus--fault-tolerance',
    destination: '/theorems/consensus-fault-tolerance',
    permanent: true,
  },
  {
    source: '/database-replication/commit-types---sync-async-and-semi-sync',
    destination: '/database-replication/commit-types-sync-async-and-semi-sync',
    permanent: true,
  },
  {
    source: '/database-replication/conflicts-and-conflicts-resolution-in-mutli-leader-replication',
    destination: '/database-replication/conflicts-and-conflict-resolution-in-multi-leader-replication',
    permanent: true,
  },
  {
    source: '/blog/differences-in-system-desgin-interview-topics',
    destination: '/blog/differences-in-system-design-interview-topics',
    permanent: true,
  },
  {
    source: '/companies/twitter/earlybird-twitter-seach-engine',
    destination: '/companies/twitter/earlybird-twitter-search-engine',
    permanent: true,
  },
  {
    source: '/companies/twitter/snow-flake',
    destination: '/companies/twitter/snowflake',
    permanent: true,
  },
]
