import { useMutation, useQueryClient } from '@tanstack/react-query'

import { addFavorite, removeFavorite } from './favorites.api'

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

export const useRemoveFavoriteMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: removeFavorite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] })
    },
    onError: (err) => {
      console.error('Error removing:', err)
    },
  })
}
