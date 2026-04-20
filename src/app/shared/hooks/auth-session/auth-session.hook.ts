'use client'

import { useQuery } from '@tanstack/react-query'

//interface
interface IAuthSessionUser {
  id: string
  name: string
  email?: string
  image?: string | null
}

interface IAuthSessionResponse {
  user: IAuthSessionUser | null
  session: { token: string } | null
}

//hook
export const useAuthSession = () => {
  return useQuery({
    queryKey: ['auth', 'session'],

    queryFn: async () => {
      const res = await fetch('/auth/session', { credentials: 'include' })

      //render
      return res.json() as Promise<IAuthSessionResponse>
    },
    staleTime: 5 * 60 * 1000,
  })
}

export const signOutAppAuth = async (): Promise<void> => {
  await fetch('/auth/sign-out', { method: 'POST', credentials: 'include' })
}
