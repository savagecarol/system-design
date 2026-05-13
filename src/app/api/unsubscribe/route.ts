import { NextRequest, NextResponse } from 'next/server'
import { collection, query, where, limit, getDocs, updateDoc } from 'firebase/firestore/lite'
import { db } from '@/lib/firebase-server'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const token = searchParams.get('token')

    if (!token) {
      return NextResponse.json({ error: 'Missing token' }, { status: 400 })
    }

    const q = query(
      collection(db, 'newsletters'),
      where('token', '==', token),
      limit(1)
    )
    const snapshot = await getDocs(q)

    if (snapshot.empty) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 404 })
    }

    await updateDoc(snapshot.docs[0].ref, { active: false })

    return new NextResponse(
      `<!DOCTYPE html>
      <html>
        <head><title>Unsubscribed - DesigningSystems.dev</title></head>
        <body style="font-family: system-ui; text-align: center; padding: 80px 20px; background: #ffffff; color: #0f172a;">
          <h1 style="color: #0088a3; margin-bottom: 16px;">Unsubscribed</h1>
          <p style="color: #64748b; margin-bottom: 32px;">You've been successfully unsubscribed from DesigningSystems.dev updates.</p>
          <a href="/" style="color: #0088a3;">Return to homepage</a>
        </body>
      </html>`,
      {
        headers: { 'Content-Type': 'text/html' },
      }
    )
  } catch (err) {
    console.error('Unsubscribe error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
