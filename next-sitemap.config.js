/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://systemdesign.io',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  outDir: 'public',
}
