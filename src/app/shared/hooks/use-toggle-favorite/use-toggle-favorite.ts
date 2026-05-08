import { useAddFavoriteMutation, useAddFavoritesQuery, useRemoveFavoriteMutation } from '@/app/entities/api/favorites'

//hook
export const useToggleFavorite = (pokemonId: number) => {
  const { data: favorites } = useAddFavoritesQuery()

  const { mutate: addFavorite, isPending: isAdding } = useAddFavoriteMutation()

  const { mutate: removeFavorite, isPending: isRemoving } = useRemoveFavoriteMutation()

  const isFavorite = favorites?.some((f) => f.pokemon_id === pokemonId) ?? false

  const isPending = isAdding || isRemoving

  const onToggle = () => {
    if (isFavorite) {
      removeFavorite(pokemonId)
    } else {
      addFavorite(pokemonId)
    }
  }

  //render
  return {
    isFavorite,
    isPending,
    onToggle,
  }
}
