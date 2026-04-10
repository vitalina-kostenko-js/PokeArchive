import { useMutation, useQueryClient } from '@tanstack/react-query'

import { addFavorite } from './favorites.api'

export const useAddFavoriteMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: addFavorite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] })
    },
    onError: (err) => {
      console.error('Error adding:', err)
    },
  })
}
