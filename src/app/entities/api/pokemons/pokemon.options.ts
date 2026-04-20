import { queryOptions } from '@tanstack/react-query'

import { getPokemonByName } from '@/app/entities/api/pokemons'
import { fetcherPokemonCardsByType, fetchPokemonCards, pokemonKeys } from '@/app/entities/api/pokemons'

export const pokemonCardsQueryOptions = (offset: number, limit: number) => {
  //render
  return queryOptions({
    queryKey: pokemonKeys.cards(offset, limit),

    queryFn: () => fetchPokemonCards(offset, limit),

    staleTime: 1000 * 60 * 5,
  })
}

export const pokemonCardsByTypeQueryOptions = (typeName: string | null, offset: number, limit: number) => {
  //render
  return queryOptions({
    queryKey: pokemonKeys.cardsByType(typeName ?? '', offset, limit),

    queryFn: () => {
      if (!typeName) {
        throw new Error('typeName is required')
      }

      //render
      return fetcherPokemonCardsByType(typeName, offset, limit)
    },

    staleTime: 1000 * 60 * 5,
  })
}

export const pokemonDetailQueryOptions = (name: string) => {
  //render
  return queryOptions({
    queryKey: pokemonKeys.detail(name),

    queryFn: () => getPokemonByName(name),

    staleTime: 1000 * 60 * 5,
  })
}
