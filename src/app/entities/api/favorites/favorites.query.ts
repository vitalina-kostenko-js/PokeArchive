import { useQuery } from '@tanstack/react-query'

import { getFavorites } from './favorites.api'

export const favoritesKeys = {
  all: ['favorites'] as const,

  list: (userId?: string) => [...favoritesKeys.all, 'list', userId] as const,
}

export const useAddFavoritesQuery = (userId?: string) => {
  return useQuery({
    queryKey: favoritesKeys.list(userId),
    queryFn: getFavorites,
  })
}
