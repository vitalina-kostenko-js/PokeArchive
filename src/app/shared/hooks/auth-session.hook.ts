'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

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

/** Reads JWT session from same-origin Next route handlers (`/auth/session`), not the external API on :4000. */
export function useAuthSession() {
  const pathname = usePathname()
  const [isPending, setIsPending] = useState(true)
  const [user, setUser] = useState<AuthSessionUser | null>(null)

  useEffect(() => {
    let cancelled = false
    setIsPending(true)

    fetch('/auth/session', { credentials: 'include' })
      .then((res) => res.json() as Promise<AuthSessionResponse>)
      .then((body) => {
        if (!cancelled) {
          setUser(body.user ?? null)
          setIsPending(false)
        }
      })
      .catch(() => {
        if (!cancelled) {
          setUser(null)
          setIsPending(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [pathname])

  return {
    isPending,
    /** Shape compatible with profile menu (`session.user`). */
    session: user ? { user } : null,
  }
}

export async function signOutAppAuth(): Promise<void> {
  await fetch('/auth/sign-out', { method: 'POST', credentials: 'include' })
}
