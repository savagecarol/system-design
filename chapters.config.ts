export interface ChapterMeta {
  title?: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  readTime: number
  description: string
}

export const defaultMeta: ChapterMeta = {
  difficulty: 'Beginner',
  readTime: 5,
  description: '',
}

export const chapterMeta: Record<string, ChapterMeta> = {
  'system-design/introduction': {
    title: 'What Is System Design?',
    difficulty: 'Beginner',
    readTime: 5,
    description: 'What is system design and how it is used in interviews.',
  },
  'requirements/functional': {
    difficulty: 'Beginner',
    readTime: 4,
    description: 'Understanding functional requirements in system design.',
  },
  'requirements/non-functional': {
    difficulty: 'Beginner',
    readTime: 5,
    description: 'Non-functional requirements: scalability, reliability, and performance.',
  },
  'capacity-estimation/definition-and-types': {
    difficulty: 'Beginner',
    readTime: 6,
    description: 'Learn what capacity estimation is and the different types.',
  },
  'capacity-estimation/thumb-rules': {
    difficulty: 'Beginner',
    readTime: 5,
    description: 'Key thumb rules for back-of-envelope estimations.',
  },
  'capacity-estimation/calculations': {
    difficulty: 'Intermediate',
    readTime: 8,
    description: 'Worked examples of capacity calculations for real systems.',
  },
  'capacity-estimation/infra': {
    title: 'Infrastructure from Capacity Estimates',
    difficulty: 'Intermediate',
    readTime: 7,
    description: 'Infrastructure planning based on capacity estimates.',
  },
  'capacity-estimation/calculationinfra': {
    title: 'Capacity Calculations and Infrastructure',
    difficulty: 'Intermediate',
    readTime: 9,
    description: 'Combined walkthrough of calculations and infrastructure.',
  },
  'scaling/introduction': {
    title: 'Introduction to Scaling',
    difficulty: 'Beginner',
    readTime: 5,
    description: 'Introduction to scaling concepts in distributed systems.',
  },
  'scaling/vertical-scaling': {
    difficulty: 'Beginner',
    readTime: 4,
    description: 'Vertical scaling: scaling up a single machine.',
  },
  'scaling/horizontal-scaling': {
    difficulty: 'Intermediate',
    readTime: 6,
    description: 'Horizontal scaling: distributing load across multiple machines.',
  },
  'scaling/load-balancer-for-horizontal-scaling': {
    title: 'Load Balancing for Horizontal Scaling',
    difficulty: 'Intermediate',
    readTime: 12,
    description: 'Load balancers explained — L4 vs L7, OSI layers, pass-through vs proxy mode, algorithms (Round Robin, Weighted, Least Connection, Consistent Hashing), and TCP/TLS termination.',
  },
  'scaling/stateless-and-stateful-service': {
    difficulty: 'Intermediate',
    readTime: 6,
    description: 'Stateless vs stateful services and their scaling implications.',
  },
  'scaling/auto-scaling': {
    difficulty: 'Intermediate',
    readTime: 7,
    description: 'Auto scaling policies and strategies for dynamic workloads.',
  },
  'networking-and-edge/proxies': {
    difficulty: 'Beginner',
    readTime: 6,
    description: 'Forward vs reverse proxies — what they are, why they exist, and common examples like Nginx, HAProxy, and Cloudflare.',
  },
  'networking-and-edge/load-balancer': {
    difficulty: 'Intermediate',
    readTime: 12,
    description: 'Load balancers explained — L4 vs L7, OSI layers, pass-through vs proxy mode, algorithms, and TCP/TLS termination.',
  },
  'networking-and-edge/cdn': {
    difficulty: 'Intermediate',
    readTime: 8,
    description: 'How CDNs work — edge caching, static asset delivery, cache invalidation, and when to use a CDN vs origin storage.',
  },
  'networking-and-edge/api-gateway': {
    difficulty: 'Intermediate',
    readTime: 10,
    description: 'API Gateway responsibilities — TLS termination, routing, auth, rate limiting, and centralized API management.',
  },
  'networking-and-edge/where-to-use-what': {
    difficulty: 'Intermediate',
    readTime: 9,
    description: 'CDN vs Load Balancer vs API Gateway vs Proxy — when you need each, with real architecture scenarios from static sites to microservices.',
  },
  'architecture-patterns/system-architecture': {
    difficulty: 'Intermediate',
    readTime: 8,
    description: 'Overview of common system architecture patterns.',
  },
  'architecture-patterns/monolithic': {
    difficulty: 'Beginner',
    readTime: 5,
    description: 'Monolithic architecture: benefits, drawbacks, and use cases.',
  },
  'architecture-patterns/microservices': {
    difficulty: 'Intermediate',
    readTime: 8,
    description: 'Microservices architecture and decomposition strategies.',
  },
  'architecture-patterns/event-driven': {
    difficulty: 'Intermediate',
    readTime: 7,
    description: 'Event-driven architecture with asynchronous communication.',
  },
  'architecture-patterns/when-to-use-what': {
    difficulty: 'Intermediate',
    readTime: 6,
    description: 'Decision framework for choosing the right architecture pattern.',
  },
  'time-and-clocks/definition': {
    title: 'Time in Distributed Systems',
    difficulty: 'Advanced',
    readTime: 6,
    description: 'Time in distributed systems: challenges and concepts.',
  },
  'time-and-clocks/physical-clock': {
    difficulty: 'Advanced',
    readTime: 7,
    description: 'Physical clocks, clock skew, and synchronization protocols.',
  },
  'time-and-clocks/logical-clock': {
    difficulty: 'Advanced',
    readTime: 8,
    description: 'Logical clocks: Lamport timestamps and vector clocks.',
  },
  'time-and-clocks/summary': {
    title: 'Time and Clocks Summary',
    difficulty: 'Advanced',
    readTime: 5,
    description: 'Summary and comparison of time synchronization approaches.',
  },
  'theorems/cap-theorem': {
    difficulty: 'Advanced',
    readTime: 8,
    description: 'CAP theorem: Consistency, Availability, Partition tolerance.',
  },
  'theorems/pacelc-theorem': {
    difficulty: 'Advanced',
    readTime: 7,
    description: 'PACELC theorem extending CAP with latency trade-offs.',
  },
  'theorems/consensus-fault-tolerance': {
    title: 'Consensus and Fault Tolerance',
    difficulty: 'Advanced',
    readTime: 9,
    description: 'Consensus algorithms and Byzantine fault tolerance.',
  },
  'data-consistency/consistency': {
    difficulty: 'Advanced',
    readTime: 7,
    description: 'Consistency models in distributed databases.',
  },
  'data-consistency/acid-properties': {
    difficulty: 'Intermediate',
    readTime: 6,
    description: 'ACID properties: Atomicity, Consistency, Isolation, Durability.',
  },
  'data-consistency/base-properties': {
    difficulty: 'Intermediate',
    readTime: 5,
    description: 'BASE properties: Basically Available, Soft state, Eventual consistency.',
  },
  'data-consistency/acid-vs-base': {
    difficulty: 'Intermediate',
    readTime: 6,
    description: 'Comparing ACID and BASE consistency models.',
  },
  'data-consistency/distributed-transactions': {
    difficulty: 'Advanced',
    readTime: 8,
    description: 'Distributed transactions: challenges and solutions.',
  },
  'data-consistency/two-phase-commit': {
    difficulty: 'Advanced',
    readTime: 8,
    description: 'Two-phase commit protocol for distributed consistency.',
  },
  'data-consistency/three-phase-commit': {
    difficulty: 'Advanced',
    readTime: 7,
    description: 'Three-phase commit protocol to avoid blocking in 2PC.',
  },
  'data-consistency/saga-pattern': {
    difficulty: 'Advanced',
    readTime: 9,
    description: 'Saga pattern for managing long-running distributed transactions.',
  },
  'data-consistency/try-confirm-cancel-pattern': {
    difficulty: 'Advanced',
    readTime: 8,
    description: 'TCC pattern for flexible distributed transaction management.',
  },
  'database-discussion/relational-database': {
    difficulty: 'Intermediate',
    readTime: 7,
    description: 'Relational databases: structure, use cases, and trade-offs.',
  },
  'database-discussion/databases-tree': {
    difficulty: 'Intermediate',
    readTime: 6,
    description: 'Visual taxonomy of database types and their relationships.',
  },
  'database-internals-and-indexing/all-concept': {
    title: 'Database Internals and Indexing',
    difficulty: 'Advanced',
    readTime: 12,
    description: 'Deep dive into database internals, storage engines, and indexing strategies.',
  },
  'database-replication/introduction': {
    title: 'Introduction to Database Replication',
    difficulty: 'Intermediate',
    readTime: 6,
    description: 'Why databases replicate data, and the reliability and latency trade-offs of copying writes across nodes.',
  },
  'database-replication/type-1-leader-follower': {
    title: 'Leader-Follower Replication',
    difficulty: 'Intermediate',
    readTime: 8,
    description: 'Single-leader replication: how followers catch up, failover, and read-after-write issues.',
  },
  'database-replication/type-2-multi-leader': {
    title: 'Multi-Leader Replication',
    difficulty: 'Advanced',
    readTime: 8,
    description: 'Multi-leader setups for multi-datacenter writes, and the conflict patterns they introduce.',
  },
  'database-replication/type-3-leaderless-replication': {
    title: 'Leaderless Replication',
    difficulty: 'Advanced',
    readTime: 8,
    description: 'Leaderless replication with quorums, hinted handoff, and read repair.',
  },
  'database-replication/commit-types-sync-async-and-semi-sync': {
    title: 'Sync, Async, and Semi-Sync Commits',
    difficulty: 'Intermediate',
    readTime: 7,
    description: 'Synchronous, asynchronous, and semi-synchronous commit — durability versus write latency.',
  },
  'database-replication/leader-election-algorithm': {
    title: 'Leader Election in Replication',
    difficulty: 'Advanced',
    readTime: 8,
    description: 'How replica sets elect a new leader after failure, and what happens to in-flight writes.',
  },
  'database-replication/conflicts-and-conflict-resolution-in-multi-leader-replication': {
    title: 'Conflict Resolution in Multi-Leader Replication',
    difficulty: 'Advanced',
    readTime: 8,
    description: 'Detecting and resolving write conflicts in multi-leader replication, including last-write-wins and merge strategies.',
  },
}
