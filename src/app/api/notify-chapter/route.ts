import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { collection, query, where, getDocs } from 'firebase/firestore/lite'
import { db } from '@/lib/firebase-server'
import { NewChapterEmail } from '@/emails/NewChapterEmail'

export async function POST(req: NextRequest) {
  try {
    const secret = req.headers.get('x-notify-secret')
    if (secret !== process.env.NOTIFY_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { title, description, url, topics } = await req.json()

    if (!title || !url) {
      return NextResponse.json({ error: 'title and url are required' }, { status: 400 })
    }

    const q = query(collection(db, 'newsletters'), where('active', '==', true))
    const snapshot = await getDocs(q)

    if (snapshot.empty) {
      return NextResponse.json({ message: 'No active subscribers', sent: 0 })
    }

    const resend = new Resend(process.env.RESEND_API_KEY)
    const siteUrl = process.env.SITE_URL ?? 'https://designingsystems.dev'

    let sent = 0
    let failed = 0

    for (const docSnap of snapshot.docs) {
      const { email, name, token } = docSnap.data()
      try {
        await resend.emails.send({
          from: 'DesigningSystems.dev <updates@designingsystems.dev>',
          to: email,
          subject: `New chapter: ${title}`,
          react: NewChapterEmail({
            recipientName: name,
            chapterTitle: title,
            chapterDescription: description,
            chapterUrl: `${siteUrl}${url}`,
            topics: topics ?? [],
            unsubscribeUrl: `${siteUrl}/api/unsubscribe?token=${token}`,
          }),
        })
        sent++
      } catch {
        failed++
      }
    }

    return NextResponse.json({ success: true, sent, failed })
  } catch (err) {
    console.error('Notify chapter error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
