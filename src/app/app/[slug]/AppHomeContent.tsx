'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { AppThemeShell } from '@/components/apps/AppThemeShell'
import type { AppRecord } from '@/lib/apps'

interface AppHomeContentProps {
  app: AppRecord
}

export function AppHomeContent({ app }: AppHomeContentProps) {
  const playHref = app.playStoreUrl || undefined
  const githubHref = app.githubUrl || undefined

  return (
    <AppThemeShell app={app}>
      <main className="max-w-5xl mx-auto px-4 pt-14 pb-20">
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-16"
        >
          <p
            className="text-sm font-mono uppercase tracking-[0.2em] mb-4"
            style={{ color: 'var(--app-accent)' }}
          >
            {app.status === 'launched' ? 'Available now' : 'Coming soon'}
          </p>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-4">{app.name}</h1>
          <p className="text-xl max-w-2xl mb-3" style={{ color: 'var(--app-muted)' }}>
            {app.tagline}
          </p>
          <p className="text-base max-w-2xl mb-8" style={{ color: 'var(--app-muted)' }}>
            {app.description}
          </p>

          <div className="flex flex-wrap gap-3">
            {playHref ? (
              <a
                href={playHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold transition-transform hover:scale-[1.02]"
                style={{ backgroundColor: 'var(--app-accent)', color: 'var(--app-bg)' }}
              >
                Get on Play Store
              </a>
            ) : (
              <span
                className="inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold opacity-60"
                style={{ backgroundColor: 'var(--app-surface)', color: 'var(--app-muted)' }}
              >
                Play Store · Coming soon
              </span>
            )}
            <Link
              href={`/app/${app.slug}/instructions`}
              className="inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold border border-white/15 hover:border-white/30 transition-colors"
              style={{ color: 'var(--app-text)' }}
            >
              How it was built
            </Link>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-semibold mb-6">What you get</h2>
          <ul className="grid sm:grid-cols-2 gap-3">
            {app.features.map(feature => (
              <li
                key={feature}
                className="rounded-2xl px-4 py-4 text-sm leading-relaxed"
                style={{ backgroundColor: 'var(--app-surface)', color: 'var(--app-text)' }}
              >
                <span style={{ color: 'var(--app-accent)' }} className="mr-2">
                  ▸
                </span>
                {feature}
              </li>
            ))}
          </ul>
        </motion.section>

        {app.screenshotPaths.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.12 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-semibold mb-6">Look & feel</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {app.screenshotPaths.map((src, index) => (
                <div
                  key={src}
                  className="relative overflow-hidden rounded-2xl border border-white/10 aspect-[4/3] bg-black/40"
                >
                  <Image
                    src={src}
                    alt={`${app.name} reference ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>
              ))}
            </div>
          </motion.section>
        )}

        <nav
          className="flex flex-wrap gap-4 text-sm font-mono pt-6 border-t border-white/10"
          style={{ color: 'var(--app-muted)' }}
        >
          <Link href={`/app/${app.slug}/privacy`} className="hover:opacity-100 opacity-80">
            Privacy
          </Link>
          <Link href={`/app/${app.slug}/instructions`} className="hover:opacity-100 opacity-80">
            Instructions
          </Link>
          {githubHref ? (
            <a
              href={githubHref}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-100 opacity-80"
            >
              GitHub
            </a>
          ) : (
            <span className="opacity-50">GitHub · Soon</span>
          )}
        </nav>
      </main>
    </AppThemeShell>
  )
}
