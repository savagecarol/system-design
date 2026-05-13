'use client'

import {
  ref,
  onValue,
  onDisconnect,
  serverTimestamp,
  set,
  remove,
  DataSnapshot,
} from 'firebase/database'
import { rtdb } from './firebase'
import { v4 as uuidv4 } from 'uuid'

let sessionId: string | null = null

function getSessionId(): string {
  if (!sessionId) {
    sessionId = uuidv4()
  }
  return sessionId
}

export function trackPresence(page: string): () => void {
  const sid = getSessionId()
  const presenceRef = ref(rtdb, `presence/${sid}`)

  set(presenceRef, {
    connectedAt: serverTimestamp(),
    currentPage: page,
  })

  onDisconnect(presenceRef).remove()

  return () => {
    remove(presenceRef)
  }
}

export function subscribeToPresenceCount(
  callback: (count: number) => void
): () => void {
  const presenceRef = ref(rtdb, 'presence')

  const unsubscribe = onValue(presenceRef, (snapshot: DataSnapshot) => {
    const count = snapshot.exists() ? Object.keys(snapshot.val()).length : 0
    callback(count)
  })

  return unsubscribe
}
