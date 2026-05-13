'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import type { User } from 'firebase/auth'
import { onAuthChange } from '@/lib/auth'
import { migrateGuestNotes } from '@/lib/notes'
import { useToast } from './ToastProvider'

interface AuthContextValue {
  user: User | null
  loading: boolean
}

const AuthContext = createContext<AuthContextValue>({ user: null, loading: true })

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const { showToast } = useToast()

  useEffect(() => {
    const unsubscribe = onAuthChange(async (firebaseUser) => {
      const prevUser = user
      setUser(firebaseUser)
      setLoading(false)

      // Guest just logged in — migrate notes
      if (firebaseUser && !prevUser) {
        const migrated = await migrateGuestNotes(firebaseUser)
        if (migrated.length > 0) {
          showToast('Your notes have been saved to your account', 'success')
        }
      }
    })

    return unsubscribe
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
