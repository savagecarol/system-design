import { SubscribeForm } from '@/components/newsletter/SubscribeForm'

export function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-neutral-800 bg-canvas dark:bg-neutral-950 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Brand */}
          <div>
            <p className="font-bold text-gray-900 dark:text-neutral-100 mb-2">DesigningSystems.dev</p>
            <p className="text-sm text-muted dark:text-neutral-500">
              Learn system design through interactive Excalidraw diagrams.
            </p>
          </div>

          {/* Newsletter */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted dark:text-neutral-500 mb-3">Stay Updated</p>
            <p className="text-sm text-muted dark:text-neutral-500 mb-3">Get notified when new chapters are published.</p>
            <SubscribeForm />
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-neutral-800 text-center text-xs text-muted dark:text-neutral-500">
          <p>&copy; {new Date().getFullYear()} DesigningSystems.dev. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
