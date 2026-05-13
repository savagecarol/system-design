'use client'

import { doc, getDoc, setDoc, increment, serverTimestamp } from 'firebase/firestore'
import { db } from './firebase'

function safeDocId(slug: string): string {
  return slug.replace(/\//g, '--')
}

export async function incrementVisit(pageSlug: string): Promise<void> {
  try {
    const ref = doc(db, 'analytics', safeDocId(pageSlug))
    await setDoc(
      ref,
      {
        totalVisits: increment(1),
        lastUpdated: serverTimestamp(),
      },
      { merge: true }
    )
  } catch (err) {
    console.error('Failed to increment visit:', err)
  }
}

export async function getVisitCount(pageSlug: string): Promise<number> {
  try {
    const ref = doc(db, 'analytics', safeDocId(pageSlug))
    const snap = await getDoc(ref)
    if (!snap.exists()) return 0
    return snap.data().totalVisits ?? 0
  } catch {
    return 0
  }
}
