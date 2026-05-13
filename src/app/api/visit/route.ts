import { NextRequest, NextResponse } from 'next/server'
import { doc, setDoc, serverTimestamp, increment } from 'firebase/firestore/lite'
import { db } from '@/lib/firebase-server'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const { pageSlug } = await req.json()
    if (!pageSlug || typeof pageSlug !== 'string') {
      return NextResponse.json({ error: 'Missing pageSlug' }, { status: 400 })
    }

    const ref = doc(db, 'analytics', pageSlug.replace(/\//g, '--'))
    await setDoc(
      ref,
      {
        totalVisits: increment(1),
        lastUpdated: serverTimestamp(),
      },
      { merge: true }
    )

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Visit increment error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
