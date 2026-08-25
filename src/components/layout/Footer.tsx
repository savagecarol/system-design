import Link from 'next/link'
import { SubscribeForm } from '@/components/newsletter/SubscribeForm'
import { footerNav } from '@/lib/nav'

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-canvas mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <p className="font-bold text-gray-900 mb-2">DesigningSystems.dev</p>
            <p className="text-sm text-muted mb-4">
              Learn system design through interactive Excalidraw diagrams.
            </p>
            <Link href="/about" className="text-sm text-brand-600 hover:underline font-mono">
              About this site
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">Learn</p>
              <ul className="space-y-2">
                {footerNav.learn.map(link => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-gray-700 hover:text-brand-600">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">Topics</p>
              <ul className="space-y-2">
                {footerNav.topics.map(link => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-gray-700 hover:text-brand-600">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">Stay Updated</p>
            <p className="text-sm text-muted mb-3">Get notified when new chapters are published.</p>
            <SubscribeForm />
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-xs text-muted">
          <p>&copy; {new Date().getFullYear()} DesigningSystems.dev. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
