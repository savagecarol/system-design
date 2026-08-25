import { extractDiagramText } from '@/lib/diagram-text'

interface LessonOutlineProps {
  title: string
  description: string
  diagramPath: string
}

export function LessonOutline({ title, description, diagramPath }: LessonOutlineProps) {
  const snippets = extractDiagramText(diagramPath)
  if (!description && snippets.length === 0) return null

  return (
    <details className="border-t border-gray-100 bg-white">
      <summary className="px-4 py-2 text-xs font-mono text-muted cursor-pointer select-none hover:text-gray-700">
        Lesson overview
      </summary>
      <article className="px-4 pb-3 max-h-48 overflow-y-auto space-y-2">
        <p className="text-sm text-gray-800 font-medium">{title}</p>
        {description && <p className="text-sm text-gray-600">{description}</p>}
        {snippets.map((snippet, index) => (
          <p key={index} className="text-sm text-gray-600 leading-relaxed">
            {snippet}
          </p>
        ))}
      </article>
    </details>
  )
}
