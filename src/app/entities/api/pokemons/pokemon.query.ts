import { queryOptions, useQuery } from '@tanstack/react-query'

import { getEvolutionChain, getPokemonByName, getPokemonByType, getPokemonList } from './pokemon.api'

// query keys
export const pokemonKeys = {
  all: ['pokemon'] as const,

  list: (offset: number, limit: number) => [...pokemonKeys.all, 'list', offset, limit] as const,
  detail: (name: string) => [...pokemonKeys.all, 'detail', name] as const,

  cards: (offset: number, limit: number) => [...pokemonKeys.all, 'cards', offset, limit] as const,
  cardsByType: (typeName: string, offset: number, limit: number) =>
    [...pokemonKeys.all, 'cards', 'type', typeName, offset, limit] as const,

  species: (name: string) => [...pokemonKeys.all, 'species', name] as const,
  evolution: (url: string) => [...pokemonKeys.all, 'evolution', url] as const,
}

// fetch pokemon cards
export const fetchPokemonCards = async (offset: number, limit: number) => {
  const list = await getPokemonList(offset, limit)
  const items = await Promise.all(list.results.map((p) => getPokemonByName(p.name)))

  //render
  return { items, totalCount: list.count }
}

// fetch pokemon cards by type
export const fetcherPokemonCardsByType = async (typeName: string, offset: number, limit: number) => {
  const typeData = await getPokemonByType(typeName)
  const sliced = typeData.pokemon.slice(offset, offset + limit)
  const items = await Promise.all(sliced.map((entry) => getPokemonByName(entry.pokemon.name)))

  //render
  return { items, totalCount: typeData.pokemon.length }
}

// cards options
export const pokemonCardsQueryOptions = (offset: number, limit: number) =>
  queryOptions({
    queryKey: pokemonKeys.cards(offset, limit),

    queryFn: () => fetchPokemonCards(offset, limit),

    staleTime: 1000 * 60 * 5,
  })

// cards by type options
export const pokemonCardsByTypeQueryOptions = (typeName: string | null, offset: number, limit: number) =>
  queryOptions({
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

// detail options
export const pokemonDetailQueryOptions = (name: string) =>
  queryOptions({
    queryKey: pokemonKeys.detail(name),

    queryFn: () => getPokemonByName(name),

    staleTime: 1000 * 60 * 5,
  })

// list query
export const usePokemonListQuery = (offset: number, limit: number) =>
  useQuery({
    queryKey: pokemonKeys.list(offset, limit),

    queryFn: () => getPokemonList(offset, limit),

    staleTime: 1000 * 60 * 5,
  })

// detail query
export const usePokemonDetailQuery = (name: string) =>
  useQuery({
    ...pokemonDetailQueryOptions(name),
    enabled: !!name,
  })

// cards query
export const usePokemonCardsQuery = (offset: number, limit: number, enabled = true) =>
  useQuery({
    ...pokemonCardsQueryOptions(offset, limit),
    enabled,
  })

// evolution query
export const usePokemonEvolutionQuery = (url: string) =>
  useQuery({
    queryKey: pokemonKeys.evolution(url),

    queryFn: () => getEvolutionChain(url),

    enabled: !!url,

    staleTime: 1000 * 60 * 5,
  })

// cards by type query
export const usePokemonCardsByTypeQuery = (typeName: string | null, offset: number, limit: number) =>
  useQuery({
    ...pokemonCardsByTypeQueryOptions(typeName, offset, limit),
    enabled: !!typeName,
  })
