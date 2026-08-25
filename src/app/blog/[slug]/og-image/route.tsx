import { ImageResponse } from 'next/og'
import { getBlogPostBySlug } from '@/lib/blogs'

export const runtime = 'nodejs'

export async function GET(
  _req: Request,
  { params }: { params: { slug: string } }
) {
  const post = getBlogPostBySlug(params.slug)

  const title = post?.title ?? 'System Design Blog'
  const description = post?.description ?? ''

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
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              background: '#3b82f6',
              borderRadius: '8px',
            }}
          />
          <span style={{ color: '#64748b', fontSize: '18px' }}>DesigningSystems.dev</span>
        </div>

        <div
          style={{
            color: '#8b5cf6',
            fontSize: '16px',
            marginBottom: '16px',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
          }}
        >
          Blog
        </div>

        <h1
          style={{
            color: '#f1f5f9',
            fontSize: '58px',
            fontWeight: 700,
            margin: 0,
            lineHeight: 1.1,
            marginBottom: '24px',
          }}
        >
          {title}
        </h1>

        {description && (
          <p
            style={{
              color: '#94a3b8',
              fontSize: '24px',
              margin: 0,
              lineHeight: 1.4,
            }}
          >
            {description.length > 140 ? `${description.slice(0, 137)}...` : description}
          </p>
        )}
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
