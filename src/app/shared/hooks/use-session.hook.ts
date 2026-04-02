'use client'

import { useEffect, useState } from 'react'

interface ISessionUser {
  id: string
  name: string
  email: string
}

interface ISessionState {
  user: ISessionUser | null
  isPending: boolean
}

export const useLocalSession = (): ISessionState => {
  const [state, setState] = useState<ISessionState>({ user: null, isPending: true })

  useEffect(() => {
    fetch('/auth/session')
      .then((r) => r.json())
      .then((data) => setState({ user: data.user ?? null, isPending: false }))
      .catch(() => setState({ user: null, isPending: false }))
  }, [])

  return state
}
