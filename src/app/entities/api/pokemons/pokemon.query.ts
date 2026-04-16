import { useQuery, UseQueryResult } from '@tanstack/react-query'

import type {
  IEvolutionChainResponse,
  IPokemon,
  IPokemonCardsQueryResult,
  IPokemonListResponse,
} from '@/app/entities/models'

import { getEvolutionChain, getPokemonByName, getPokemonByType, getPokemonList } from './pokemon.api'
import { pokemonCardsByTypeQueryOptions, pokemonCardsQueryOptions, pokemonDetailQueryOptions } from './pokemon.options'

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

// fetchers
export const fetchPokemonCards = async (offset: number, limit: number): Promise<IPokemonCardsQueryResult> => {
  const list = await getPokemonList(offset, limit)

  const items = await Promise.all(list.results.map((p) => getPokemonByName(p.name)))

  //render
  return { items, totalCount: list.count }
}

export const fetcherPokemonCardsByType = async (
  typeName: string,
  offset: number,
  limit: number,
): Promise<IPokemonCardsQueryResult> => {
  const typeData = await getPokemonByType(typeName)

  const sliced = typeData.pokemon.slice(offset, offset + limit)

  const items = await Promise.all(sliced.map((entry) => getPokemonByName(entry.pokemon.name)))

  //render
  return {
    items,
    totalCount: typeData.pokemon.length,
  }
}

// query hooks
export const usePokemonListQuery = (offset: number, limit: number): UseQueryResult<IPokemonListResponse> => {
  //render
  return useQuery({
    queryKey: pokemonKeys.list(offset, limit),

    queryFn: () => getPokemonList(offset, limit),

    staleTime: 1000 * 60 * 5,
  })
}

export const usePokemonDetailQuery = (name: string): UseQueryResult<IPokemon> => {
  //render
  return useQuery({
    ...pokemonDetailQueryOptions(name),
    enabled: !!name,
  })
}

export const usePokemonCardsQuery = (
  offset: number,
  limit: number,
  enabled = true,
): UseQueryResult<IPokemonCardsQueryResult> => {
  //render
  return useQuery({
    ...pokemonCardsQueryOptions(offset, limit),

    enabled,
  })
}

export const usePokemonEvolutionQuery = (url: string): UseQueryResult<IEvolutionChainResponse> => {
  //render
  return useQuery({
    queryKey: pokemonKeys.evolution(url),

    queryFn: () => getEvolutionChain(url),

    enabled: !!url,

    staleTime: 1000 * 60 * 5,
  })
}

export const usePokemonCardsByTypeQuery = (
  typeName: string | null,
  offset: number,
  limit: number,
): UseQueryResult<IPokemonCardsQueryResult> => {
  //render
  return useQuery({
    ...pokemonCardsByTypeQueryOptions(typeName, offset, limit),

    enabled: !!typeName,
  })
}
