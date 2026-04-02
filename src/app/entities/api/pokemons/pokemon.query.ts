import { useQuery } from '@tanstack/react-query'

import type { IPokemon } from '@/app/shared/interfaces'

import { getEvolutionChain, getPokemonByName, getPokemonList, getPokemonSpecies } from './pokemon.api'

// query keys
export const pokemonKeys = {
  all: ['pokemon'] as const,
  list: (offset: number, limit: number) => [...pokemonKeys.all, 'list', offset, limit] as const,
  detail: (name: string) => [...pokemonKeys.all, 'detail', name] as const,
}

// query hooks
export const usePokemonListQuery = (offset: number, limit: number) =>
  useQuery({
    queryKey: pokemonKeys.list(offset, limit),
    queryFn: () => getPokemonList(offset, limit),
    staleTime: 1000 * 60 * 5,
  })

export const usePokemonDetailQuery = (name: string) =>
  useQuery({
    queryKey: pokemonKeys.detail(name),
    queryFn: () => getPokemonByName(name),
    enabled: !!name,
    staleTime: 1000 * 60 * 5,
  })

export type PokemonCardsQueryResult = {
  items: IPokemon[]
  totalCount: number
}

export const pokemonCardsQueryKey = (offset: number, limit: number) =>
  [...pokemonKeys.all, 'cards', offset, limit] as const

export async function fetchPokemonCards(offset: number, limit: number): Promise<PokemonCardsQueryResult> {
  const list = await getPokemonList(offset, limit)
  const details = await Promise.all(list.results.map((p) => getPokemonByName(p.name)))
  return { items: details, totalCount: list.count }
}

export const usePokemonCardsQuery = (offset: number, limit: number, enabled = true) =>
  useQuery({
    queryKey: pokemonCardsQueryKey(offset, limit),
    queryFn: () => fetchPokemonCards(offset, limit),
    enabled,
    staleTime: 1000 * 60 * 5,
  })

export const useFullPokemonData = (name: string) => {
  const pokemonQuery = useQuery({
    queryKey: ['pokemon', 'details', name],
    queryFn: () => getPokemonByName(name),
  })

  const speciesQuery = useQuery({
    queryKey: ['pokemon', 'species', name],
    queryFn: () => getPokemonSpecies(name),
    enabled: !!pokemonQuery.data,
  })

  return {
    pokemon: pokemonQuery.data,
    species: speciesQuery.data,
    isLoading: pokemonQuery.isLoading || speciesQuery.isLoading,
    isError: pokemonQuery.isError || speciesQuery.isError,
  }
}

export const usePokemonEvolution = (name: string) => {
  const speciesQuery = useQuery({
    queryKey: ['pokemon', 'species', name],
    queryFn: () => getPokemonSpecies(name),
  })

  const evoUrl = speciesQuery.data?.evolution_chain.url

  const evolutionQuery = useQuery({
    queryKey: ['pokemon', 'evolution', evoUrl],
    queryFn: () => getEvolutionChain(evoUrl!),
    enabled: !!evoUrl,
  })

  return {
    chain: evolutionQuery.data?.chain,
    isLoading: speciesQuery.isLoading || evolutionQuery.isLoading,
  }
}
