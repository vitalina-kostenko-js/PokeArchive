import { useMutation, useQueryClient } from '@tanstack/react-query'

import { addFavorite, removeFavorite } from './favorites.api'
import { favoritesKeys } from './favorites.query'

//add favorite mutation
export const useAddFavoriteMutation = () => {
  const queryClient = useQueryClient()

  //render
  return useMutation({
    mutationFn: addFavorite,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: favoritesKeys.all })
    },

    onError: (err) => {
      console.error('Error adding:', err)
    },
  })
}

//remove favorite mutation
export const useRemoveFavoriteMutation = () => {
  const queryClient = useQueryClient()

  //render
  return useMutation({
    mutationFn: removeFavorite,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: favoritesKeys.all })
    },

    onError: (err) => {
      console.error('Error removing:', err)
    },
  })
}
