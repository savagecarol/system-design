'use client'

import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'
import { db } from './firebase'
import type { User } from './auth'

const NOTES_PREFIX = 'notes_'

export function getLocalNotes(slug: string): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(`${NOTES_PREFIX}${slug}`)
}

export function setLocalNotes(slug: string, json: string): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(`${NOTES_PREFIX}${slug}`, json)
}

export function clearLocalNotes(slug: string): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(`${NOTES_PREFIX}${slug}`)
}

function safeNoteId(slug: string): string {
  // Firestore doc IDs cannot contain '/' — replace with '--'
  return slug.replace(/\//g, '--')
}

export async function saveNotesToFirestore(
  user: User,
  slug: string,
  chapterTitle: string,
  excalidrawJson: string
): Promise<void> {
  const ref = doc(db, 'users', user.uid, 'notes', safeNoteId(slug))
  await setDoc(ref, {
    excalidrawJson,
    chapterTitle,
    updatedAt: serverTimestamp(),
  })
}

export async function getNotesFromFirestore(
  user: User,
  slug: string
): Promise<string | null> {
  const ref = doc(db, 'users', user.uid, 'notes', safeNoteId(slug))
  const snap = await getDoc(ref)
  if (!snap.exists()) return null
  return snap.data().excalidrawJson ?? null
}

export async function loadNotes(
  user: User | null,
  slug: string
): Promise<string | null> {
  // First check localStorage
  const local = getLocalNotes(slug)
  if (local) return local

  // If logged in, try Firestore
  if (user) {
    const remote = await getNotesFromFirestore(user, slug)
    if (remote) {
      setLocalNotes(slug, remote)
      return remote
    }
  }

  return null
}

export async function migrateGuestNotes(user: User): Promise<string[]> {
  if (typeof window === 'undefined') return []

  const migratedSlugs: string[] = []
  const keys = Object.keys(localStorage).filter(k => k.startsWith(NOTES_PREFIX))

  for (const key of keys) {
    const slug = key.slice(NOTES_PREFIX.length)
    const json = localStorage.getItem(key)
    if (!json) continue

    try {
      await saveNotesToFirestore(user, slug, slug, json)
      migratedSlugs.push(slug)
    } catch (err) {
      console.error(`Failed to migrate notes for ${slug}:`, err)
    }
  }

  return migratedSlugs
}
