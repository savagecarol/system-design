/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://designingsystems.dev',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  outDir: 'public',
  exclude: ['/api/*', '/*/og-image', '/companies/*/og-image'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
}
