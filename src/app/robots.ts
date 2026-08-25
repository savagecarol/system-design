import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/*/*/og-image', '/blog/*/og-image', '/companies/*/*/og-image'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
