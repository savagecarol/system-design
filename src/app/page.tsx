import { getChaptersByCategory } from '@/lib/content'
import { getAllBlogPosts } from '@/lib/blogs'
import { getAllCompanies } from '@/lib/companies'
import { HomeContent } from './HomeContent'

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