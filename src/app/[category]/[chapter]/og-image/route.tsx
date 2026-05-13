import { ImageResponse } from 'next/og'
import { getChapterBySlug } from '@/lib/content'

export const runtime = 'nodejs'

export async function GET(
  _req: Request,
  { params }: { params: { category: string; chapter: string } }
) {
  const chapter = getChapterBySlug(params.category, params.chapter)

  const title = chapter?.title ?? 'System Design'
  const category = chapter?.category ?? ''
  const description = chapter?.description ?? ''
  const difficulty = chapter?.difficulty ?? 'Beginner'

  const difficultyColor =
    difficulty === 'Beginner'
      ? '#10b981'
      : difficulty === 'Intermediate'
      ? '#f59e0b'
      : '#ef4444'

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: '#0f172a',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            background: '#3b82f6',
            borderRadius: '8px',
          }} />
          <span style={{ color: '#64748b', fontSize: '18px' }}>DesigningSystems.dev</span>
        </div>

        {/* Category */}
        {category && (
          <div style={{ color: '#3b82f6', fontSize: '16px', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            {category}
          </div>
        )}

        {/* Title */}
        <h1 style={{
          color: '#f1f5f9',
          fontSize: '64px',
          fontWeight: 700,
          margin: 0,
          lineHeight: 1.1,
          marginBottom: '24px',
        }}>
          {title}
        </h1>

        {/* Description */}
        {description && (
          <p style={{
            color: '#94a3b8',
            fontSize: '24px',
            margin: 0,
            lineHeight: 1.4,
            marginBottom: '32px',
          }}>
            {description}
          </p>
        )}

        {/* Difficulty badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          <span style={{
            background: `${difficultyColor}20`,
            color: difficultyColor,
            padding: '6px 16px',
            borderRadius: '9999px',
            fontSize: '16px',
            fontWeight: 500,
          }}>
            {difficulty}
          </span>
          {chapter?.readTime && (
            <span style={{ color: '#64748b', fontSize: '16px' }}>
              · {chapter.readTime} min read
            </span>
          )}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
