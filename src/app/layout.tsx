import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import '@excalidraw/excalidraw/index.css'
import { ToastProvider } from '@/components/ui/ToastProvider'
import { AuthProvider } from '@/components/ui/AuthProvider'
import { ThemeProvider } from '@/components/ui/ThemeProvider'

const inter = Inter({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: 'DesigningSystems.dev — Learn System Design',
    template: '%s | DesigningSystems.dev',
  },
  description:
    'Master system design concepts through interactive Excalidraw diagrams. Topics include scaling, databases, architecture patterns, and more.',
  metadataBase: new URL(process.env.SITE_URL ?? 'https://designingsystems.dev'),
  openGraph: {
    type: 'website',
    siteName: 'DesigningSystems.dev',
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-canvas dark:bg-neutral-950 text-gray-900 dark:text-neutral-100`}>
        <ThemeProvider>
          <ToastProvider>
            <AuthProvider>
              {children}
            </AuthProvider>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
