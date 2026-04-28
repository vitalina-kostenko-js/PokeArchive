import { queryOptions } from '@tanstack/react-query'

import { getPokemonByName, fetchPokemonCards, pokemonKeys, fetcherPokemonCardsByType } from '@/app/entities/api/pokemons'

//cards query options 
export const pokemonCardsQueryOptions = (offset: number, limit: number) => {
  //render
  return queryOptions({
    queryKey: pokemonKeys.cards(offset, limit),

    queryFn: () => fetchPokemonCards(offset, limit),

    staleTime: 1000 * 60 * 5,
  })
}

//cards by type query options
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

//detail query options
export const pokemonDetailQueryOptions = (name: string) => {
  //render
  return queryOptions({
    queryKey: pokemonKeys.detail(name),

    queryFn: () => getPokemonByName(name),

    staleTime: 1000 * 60 * 5,
  })
}
