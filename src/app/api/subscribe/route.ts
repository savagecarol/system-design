import { NextRequest, NextResponse } from 'next/server'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore/lite'
import { db } from '@/lib/firebase-server'
import { hashEmail, createSubscriber } from '@/lib/newsletter'

export async function POST(req: NextRequest) {
  try {
    const { email, name } = await req.json()

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
    }

    const emailHash = hashEmail(email)
    const subscriber = createSubscriber(email, name)

    const ref = doc(db, 'newsletters', emailHash)
    await setDoc(ref, {
      ...subscriber,
      subscribedAt: serverTimestamp(),
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Subscribe error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
