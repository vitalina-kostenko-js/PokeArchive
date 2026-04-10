import { useQuery } from '@tanstack/react-query'

import { getFavorites } from './favorites.api'

export const useAddFacoritesQuery = () => {
  return useQuery({
    queryKey: ['favorites'],
    queryFn: getFavorites,
  })
}
