import { getChaptersByCategory } from '@/lib/content'
import { getAllBlogPosts } from '@/lib/blogs'
import { getAllCompanies } from '@/lib/companies'
import { HomeContent } from './HomeContent'
import { pageMetadata } from '@/lib/seo'
import { SITE_DESCRIPTION, SITE_NAME } from '@/lib/site'

const homeMetadata = pageMetadata({
  title: `${SITE_NAME} — Learn System Design`,
  description: SITE_DESCRIPTION,
  path: '/',
  ogImageAlt: `${SITE_NAME} — Learn System Design`,
})

export const metadata = {
  ...homeMetadata,
  title: {
    absolute: `${SITE_NAME} — Learn System Design`,
  },
}

export default function HomePage() {
  const categories = getChaptersByCategory()
  const totalChapters = categories.reduce((acc, cat) => acc + cat.chapters.length, 0)
  const blogCount = getAllBlogPosts().length
  const companies = getAllCompanies()
  const companyCount = companies.length
  const companyPostCount = companies.reduce((acc, c) => acc + c.postCount, 0)

  return (
    <HomeContent
      categories={categories}
      totalChapters={totalChapters}
      blogCount={blogCount}
      companyCount={companyCount}
      companyPostCount={companyPostCount}
    />
  )
}