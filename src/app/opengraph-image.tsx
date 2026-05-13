import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'DesigningSystems.dev — Learn System Design'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
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
        {/* Brand row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '48px' }}>
          <div
            style={{
              width: '44px',
              height: '44px',
              background: '#3b82f6',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div style={{ width: '24px', height: '24px', background: '#fff', borderRadius: '4px' }} />
          </div>
          <span style={{ color: '#64748b', fontSize: '20px', letterSpacing: '0.02em' }}>
            DesigningSystems.dev
          </span>
        </div>

        {/* Headline */}
        <h1
          style={{
            color: '#f1f5f9',
            fontSize: '72px',
            fontWeight: 700,
            margin: 0,
            lineHeight: 1.05,
            marginBottom: '28px',
          }}
        >
          Learn System Design
        </h1>

        {/* Sub-headline */}
        <p
          style={{
            color: '#94a3b8',
            fontSize: '28px',
            margin: 0,
            lineHeight: 1.4,
            maxWidth: '800px',
          }}
        >
          Master scaling, databases, and architecture patterns through interactive diagrams.
        </p>

        {/* Topic pills */}
        <div style={{ display: 'flex', gap: '12px', marginTop: '48px' }}>
          {['Scaling', 'Databases', 'Caching', 'Load Balancing'].map((topic) => (
            <div
              key={topic}
              style={{
                background: '#1e293b',
                border: '1px solid #334155',
                color: '#3b82f6',
                padding: '8px 20px',
                borderRadius: '9999px',
                fontSize: '18px',
                fontWeight: 500,
              }}
            >
              {topic}
            </div>
          ))}
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
