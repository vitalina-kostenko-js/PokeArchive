'use client'

import { useEffect, useState } from 'react'

import { usePathname } from '@/pkg/locale'

type AuthSessionUser = {
  id: string
  name: string
  email?: string
  image?: string | null
}

type AuthSessionResponse = {
  user: AuthSessionUser | null
  session: { token: string } | null
}

export function useAuthSession() {
  const pathname = usePathname()

  const [isPending, setIsPending] = useState(true)
  const [user, setUser] = useState<AuthSessionUser | null>(null)

  useEffect(() => {
    let cancelled = false

    const fetchSession = async () => {
      try {
        const res = await fetch('/auth/session', { credentials: 'include' })
        const body = (await res.json()) as AuthSessionResponse

        if (!cancelled) {
          setUser(body.user ?? null)
          setIsPending(false)
        }
      } catch {
        if (!cancelled) {
          setUser(null)
          setIsPending(false)
        }
      }
    }

    fetchSession()

    return () => {
      cancelled = true
    }
  }, [pathname])

  return {
    isPending,
    session: user ? { user } : null,
  }
}

export async function signOutAppAuth(): Promise<void> {
  await fetch('/auth/sign-out', { method: 'POST', credentials: 'include' })
}
