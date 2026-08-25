import { ImageResponse } from 'next/og'
import { getCompanyBySlug, getCompanyPost } from '@/lib/companies'

export const runtime = 'nodejs'

export async function GET(
  _req: Request,
  { params }: { params: { company: string; slug: string } }
) {
  const company = getCompanyBySlug(params.company)
  const post = getCompanyPost(params.company, params.slug)

  const title = post?.title ?? 'Company Case Study'
  const description = post?.description ?? ''
  const companyName = company?.name ?? 'Company'
  const brandColor = company?.brandColor ?? '#3b82f6'
  const logoMark = company?.logoMark ?? companyName.charAt(0)

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

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              background: brandColor,
              borderRadius: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontSize: '28px',
              fontWeight: 700,
            }}
          >
            {logoMark}
          </div>
          <span
            style={{
              color: '#94a3b8',
              fontSize: '20px',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
            }}
          >
            {companyName} Case Study
          </span>
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
              marginBottom: '32px',
            }}
          >
            {description.length > 120 ? `${description.slice(0, 117)}...` : description}
          </p>
        )}

        {post?.readTime && (
          <span style={{ color: '#64748b', fontSize: '18px' }}>{post.readTime} min read</span>
        )}
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
