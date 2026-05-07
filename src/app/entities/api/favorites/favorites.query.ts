import { useQuery } from '@tanstack/react-query'

import { useAuthSession } from '@/app/shared/hooks/auth-session'
import { getFavorites } from './favorites.api'

// query keys
export const favoritesKeys = {
  all: ['favorites'] as const,

  list: (userId?: string) => [...favoritesKeys.all, 'list', userId] as const,
}

export const useAddFavoritesQuery = () => {
  const { data: session } = useAuthSession()

  const userId = session?.user?.id

  //render
  return useQuery({
    queryKey: favoritesKeys.list(userId),
    queryFn: getFavorites,
    enabled: !!userId,
  })
}
