'use client'

import { HeartIcon } from 'lucide-react'
import { FC } from 'react'

import { useAddFavoriteMutation, useAddFavoritesQuery, useRemoveFavoriteMutation } from '@/app/entities/api/favorites'
import { Button } from '@/pkg/theme/ui/button'

//interface
interface IProps {
  pokemonId: number
}

//component
const FavoriteButtonComponent: FC<Readonly<IProps>> = (props) => {
  const { pokemonId } = props

  const { data: favorites } = useAddFavoritesQuery()

  const { mutate: addFavorite, isPending: isAdding } = useAddFavoriteMutation()
  const { mutate: removeFavorite, isPending: isRemoving } = useRemoveFavoriteMutation()

  const isFavorite = favorites?.some((f: { pokemon_id: number }) => f.pokemon_id === pokemonId)
  const isPending = isAdding || isRemoving

  const handleToggle = () => {
    if (isFavorite) {
      removeFavorite(pokemonId)
    } else {
      addFavorite(pokemonId)
    }
  }

  //render
  return (
    <Button variant='ghost' size='icon' onClick={handleToggle} disabled={isPending}>
      <HeartIcon
        className={`size-5 transition-colors ${isFavorite ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`}
      />
    </Button>
  )
}

export default FavoriteButtonComponent
