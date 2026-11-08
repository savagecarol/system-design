interface MarkdownArticleProps {
  html: string
  className?: string
  variant?: 'light' | 'dark'
}

export function MarkdownArticle({
  html,
  className = '',
  variant = 'light',
}: MarkdownArticleProps) {
  const tone =
    variant === 'dark'
      ? 'prose-invert [&_a]:text-[var(--app-accent)] [&_code]:bg-white/10 [&_pre]:bg-black/40 [&_hr]:border-white/15'
      : '[&_a]:text-brand-600 [&_code]:bg-gray-100 [&_pre]:bg-gray-900 [&_pre]:text-gray-100 [&_hr]:border-gray-200'

  return (
    <article
      className={`prose-apps space-y-4 text-base leading-relaxed [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:tracking-tight [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mt-8 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mt-6 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:my-1 [&_p]:text-inherit [&_pre]:rounded-xl [&_pre]:p-4 [&_pre]:overflow-x-auto [&_code]:rounded [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-sm ${tone} ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
