import type { IPokemon } from '@/app/entities/models'
import { useQuery } from '@tanstack/react-query'
import { getEvolutionChain, getPokemonByName, getPokemonByType, getPokemonList } from './pokemon.api'

export type PokemonCardsQueryResult = {
  items: IPokemon[]
  totalCount: number
}

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
export const fetchPokemonCards = async (offset: number, limit: number): Promise<PokemonCardsQueryResult> => {
  const list = await getPokemonList(offset, limit)

  const items = await Promise.all(list.results.map((p) => getPokemonByName(p.name)))

  return { items, totalCount: list.count }
}

export const fetcherPokemonCardsByType = async (
  typeName: string,
  offset: number,
  limit: number,
): Promise<PokemonCardsQueryResult> => {
  const typeData = await getPokemonByType(typeName)

  const sliced = typeData.pokemon.slice(offset, offset + limit)

  const items = await Promise.all(sliced.map((entry) => getPokemonByName(entry.pokemon.name)))

  return {
    items,
    totalCount: typeData.pokemon.length,
  }
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

export const usePokemonCardsQuery = (offset: number, limit: number, enabled = true) =>
  useQuery({
    queryKey: pokemonKeys.cards(offset, limit),
    queryFn: () => fetchPokemonCards(offset, limit),
    enabled,
    staleTime: 1000 * 60 * 5,
  })

// export const usePokemonSpeciesQuery = (name: string) =>
//   useQuery({
//     queryKey: pokemonKeys.species(name),
//     queryFn: () => getPokemonSpecies(name),
//     enabled: !!name,
//     staleTime: 1000 * 60 * 5,
//   })

export const usePokemonEvolutionQuery = (url: string) =>
  useQuery({
    queryKey: pokemonKeys.evolution(url),
    queryFn: () => getEvolutionChain(url),
    enabled: !!url,
    staleTime: 1000 * 60 * 5,
  })

export const usePokemonCardsByTypeQuery = (typeName: string | null, offset: number, limit: number) =>
  useQuery({
    queryKey: pokemonKeys.cardsByType(typeName ?? '', offset, limit),
    queryFn: () => fetcherPokemonCardsByType(typeName!, offset, limit),
    enabled: !!typeName,
    staleTime: 1000 * 60 * 5,
  })
