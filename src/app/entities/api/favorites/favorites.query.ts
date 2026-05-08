import { queryOptions, useQuery } from '@tanstack/react-query'

import { useAuthSession } from '@/app/shared/hooks/auth-session'

import { getFavorites } from './favorites.api'

// query keys
export const favoritesKeys = {
  all: ['favorites'] as const,

  list: (userId?: string) => [...favoritesKeys.all, 'list', userId] as const,
}

// list options
export const favoritesListQueryOptions = (userId?: string) => {
  //render
  return queryOptions({
    queryKey: favoritesKeys.list(userId),
    queryFn: getFavorites,
    staleTime: 1000 * 60 * 2,
  })
}

// list query
export const useAddFavoritesQuery = () => {
  const { data: session } = useAuthSession()

  const userId = session?.user?.id

  //render
  return useQuery({
    ...favoritesListQueryOptions(userId),
    enabled: !!userId,
  })
}
