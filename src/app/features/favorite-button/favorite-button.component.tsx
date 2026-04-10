'use client'

import { FC } from 'react'

import { Button } from '../../../pkg/theme/ui/button'
import { useAddFacoritesQuery, useAddFavoriteMutation } from '../../entities/api/favorites'

interface IProps {
  pokemonId: number
}

const FavoriteButtonComponent: FC<Readonly<IProps>> = (props) => {
  const { pokemonId } = props

  const { data: favorites } = useAddFacoritesQuery()
  const { mutate: addFavorite, isPending } = useAddFavoriteMutation()

  const isFavorite = favorites?.some((f: { pokemon_id: number }) => f.pokemon_id === pokemonId)

  return (
    <Button onClick={() => addFavorite(pokemonId)} disabled={isPending || isFavorite}>
      {isPending ? 'Adding...' : isFavorite ? 'In favorites' : 'Add to favorites'}
    </Button>
  )
}

export default FavoriteButtonComponent
