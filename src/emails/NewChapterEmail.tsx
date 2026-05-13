import * as React from 'react'

interface NewChapterEmailProps {
  recipientName?: string
  chapterTitle: string
  chapterDescription?: string
  chapterUrl: string
  topics?: string[]
  unsubscribeUrl: string
}

export function NewChapterEmail({
  recipientName,
  chapterTitle,
  chapterDescription,
  chapterUrl,
  topics = [],
  unsubscribeUrl,
}: NewChapterEmailProps) {
  return (
    <html>
      <body style={{ fontFamily: 'system-ui, -apple-system, sans-serif', background: '#f8fafc', padding: '40px 20px', margin: 0 }}>
        <div style={{ maxWidth: '580px', margin: '0 auto' }}>

          {/* Navbar header — table layout for email compat */}
          <table width="100%" cellPadding={0} cellSpacing={0} style={{ background: '#ffffff', borderRadius: '12px 12px 0 0', borderBottom: '1px solid #e2e8f0' }}>
            <tbody>
              <tr>
                <td style={{ padding: '16px 32px' }}>
                  {/* 4-square logo as a 2x2 table since SVG is unreliable in email */}
                  <table cellPadding={0} cellSpacing={2} style={{ display: 'inline-table', verticalAlign: 'middle', marginRight: '8px' }}>
                    <tbody>
                      <tr>
                        <td style={{ width: '8px', height: '8px', background: '#6366f1', borderRadius: '2px' }} />
                        <td style={{ width: '8px', height: '8px', background: '#6366f1', borderRadius: '2px', opacity: 0.6 }} />
                      </tr>
                      <tr>
                        <td style={{ width: '8px', height: '8px', background: '#6366f1', borderRadius: '2px', opacity: 0.6 }} />
                        <td style={{ width: '8px', height: '8px', background: '#6366f1', borderRadius: '2px', opacity: 0.3 }} />
                      </tr>
                    </tbody>
                  </table>
                  <span style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: '15px', color: '#0f172a', verticalAlign: 'middle' }}>
                    DesigningSystems.dev
                  </span>
                </td>
              </tr>
            </tbody>
          </table>

          {/* Body */}
          <table width="100%" cellPadding={0} cellSpacing={0} style={{ background: '#ffffff' }}>
            <tbody>
              <tr>
                <td style={{ padding: '36px 32px 40px' }}>

                  {/* Badge */}
                  <div style={{ marginBottom: '20px' }}>
                    <span style={{
                      background: '#eef2ff',
                      color: '#6366f1',
                      fontSize: '11px',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase' as const,
                      padding: '4px 12px',
                      borderRadius: '9999px',
                      display: 'inline-block',
                    }}>
                      New Chapter Published
                    </span>
                  </div>

                  {recipientName && (
                    <p style={{ color: '#6b7280', fontSize: '15px', margin: '0 0 6px' }}>Hi {recipientName},</p>
                  )}

                  <h1 style={{ color: '#0f172a', fontSize: '26px', fontWeight: 700, margin: '0 0 12px', lineHeight: 1.25 }}>
                    {chapterTitle}
                  </h1>

                  {chapterDescription && (
                    <p style={{ color: '#6b7280', fontSize: '15px', lineHeight: 1.65, margin: '0 0 28px' }}>
                      {chapterDescription}
                    </p>
                  )}

                  {/* Topics list — table layout, no flexbox */}
                  {topics.length > 0 && (
                    <div style={{ marginBottom: '32px' }}>
                      <p style={{
                        color: '#0f172a',
                        fontSize: '12px',
                        fontWeight: 700,
                        textTransform: 'uppercase' as const,
                        letterSpacing: '0.08em',
                        margin: '0 0 14px',
                      }}>
                        Topics covered
                      </p>
                      <table cellPadding={0} cellSpacing={0} style={{ borderLeft: '2px solid #e0e7ff', paddingLeft: '0' }}>
                        <tbody>
                          {topics.map((topic, i) => (
                            <tr key={i}>
                              <td style={{ paddingLeft: '14px', paddingBottom: i < topics.length - 1 ? '10px' : '0', verticalAlign: 'top' }}>
                                <table cellPadding={0} cellSpacing={0}>
                                  <tbody>
                                    <tr>
                                      {/* Number circle — inline-block with line-height trick */}
                                      <td style={{ verticalAlign: 'top', paddingRight: '10px' }}>
                                        <span style={{
                                          display: 'inline-block',
                                          background: '#6366f1',
                                          color: '#ffffff',
                                          fontSize: '10px',
                                          fontWeight: 700,
                                          width: '20px',
                                          height: '20px',
                                          lineHeight: '20px',
                                          borderRadius: '50%',
                                          textAlign: 'center' as const,
                                        }}>
                                          {i + 1}
                                        </span>
                                      </td>
                                      <td style={{ verticalAlign: 'middle' }}>
                                        <span style={{ color: '#374151', fontSize: '14px', lineHeight: 1.5 }}>{topic}</span>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* CTA button */}
                  <a
                    href={chapterUrl}
                    style={{
                      display: 'inline-block',
                      background: '#6366f1',
                      color: '#ffffff',
                      padding: '12px 24px',
                      borderRadius: '8px',
                      fontWeight: 600,
                      fontSize: '15px',
                      textDecoration: 'none',
                    }}
                  >
                    Explore Chapter &rarr;
                  </a>

                </td>
              </tr>
            </tbody>
          </table>

          {/* Footer */}
          <table width="100%" cellPadding={0} cellSpacing={0} style={{ background: '#f8fafc', borderRadius: '0 0 12px 12px', borderTop: '1px solid #e2e8f0' }}>
            <tbody>
              <tr>
                <td style={{ padding: '20px 32px', textAlign: 'center' as const }}>
                  <p style={{ color: '#9ca3af', fontSize: '12px', margin: 0, lineHeight: 1.6 }}>
                    You received this because you subscribed to DesigningSystems.dev updates.
                    <br />
                    <a href={unsubscribeUrl} style={{ color: '#9ca3af', textDecoration: 'underline' }}>
                      Unsubscribe
                    </a>
                  </p>
                </td>
              </tr>
            </tbody>
          </table>

        </div>
      </body>
    </html>
  )
}
