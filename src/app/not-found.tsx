import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-canvas">
      <Navbar />
      <main className="max-w-xl mx-auto px-4 pt-32 pb-16 text-center">
        <p className="text-xs font-mono text-muted mb-3">404</p>
        <h1 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">Page not found</h1>
        <p className="text-muted mb-8">
          That URL does not match a chapter, blog post, or company case study.
        </p>
        <div className="flex flex-wrap justify-center gap-3 text-sm font-mono">
          <Link href="/" className="px-4 py-2 rounded-lg bg-brand-500 text-black hover:bg-brand-600">
            Home
          </Link>
          <Link href="/blog" className="px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50">
            Blog
          </Link>
          <Link href="/companies" className="px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50">
            Companies
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}
