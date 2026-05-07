import { useQuery } from '@tanstack/react-query'

import { useAuthSession } from '@/app/shared/hooks/auth-session'

import { favoritesKeys } from '@/app/entities/models'
import { getFavorites } from './favorites.api'

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
