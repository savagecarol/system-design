import { getChaptersByCategory } from '@/lib/content'
import { HomeContent } from './HomeContent'

export default function HomePage() {
  const categories = getChaptersByCategory()
  const totalChapters = categories.reduce((acc, cat) => acc + cat.chapters.length, 0)
  return <HomeContent categories={categories} totalChapters={totalChapters} />
}