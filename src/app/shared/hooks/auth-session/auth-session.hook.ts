'use client'

import { useQuery } from '@tanstack/react-query'

import { restApiFetcher } from '@/pkg/rest-api/fetcher'

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

    queryFn: () => restApiFetcher.get('auth/session', { credentials: 'include' }).json<IAuthSessionResponse>(),
    
    staleTime: 5 * 60 * 1000,
  })
}

export const signOutAppAuth = async (): Promise<void> => {
  await restApiFetcher.post('auth/sign-out', { credentials: 'include' })
}
