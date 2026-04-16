import ky from 'ky'

import type {
  IEvolutionChainResponse,
  IPokemon,
  IPokemonListResponse,
  IPokemonSpecies,
  IPokemonTypeResponse,
} from '@/app/entities/models'
import { pokeApiFetcher } from '@/pkg/rest-api/fetcher'

export const getPokemonList = async (offset = 0, limit = 20): Promise<IPokemonListResponse> => {
  return pokeApiFetcher.get('pokemon', { searchParams: { offset, limit } }).json()
}

export const getPokemonByName = async (name: string): Promise<IPokemon> => {
  return pokeApiFetcher.get(`pokemon/${encodeURIComponent(name)}`).json()
}

export const getPokemonSpecies = async (name: string): Promise<IPokemonSpecies> => {
  return pokeApiFetcher.get(`pokemon-species/${encodeURIComponent(name)}`).json()
}

export const getEvolutionChain = async (url: string): Promise<IEvolutionChainResponse> => {
  const parsed = new URL(url)

  if (parsed.hostname !== 'pokeapi.co') {
    throw new Error('Invalid evolution chain URL')
  }

  return ky.get(url).json()
}

export const getPokemonByType = async (typeName: string): Promise<IPokemonTypeResponse> => {
  return pokeApiFetcher(`type/${encodeURIComponent(typeName)}`).json()
}

export const getFullPokemonData = async (id: string) => {
  try {
    const [pokemon, species] = await Promise.all([getPokemonByName(id), getPokemonSpecies(id)])

    if (!pokemon) {
      return null
    }

    return { ...pokemon, species }
  } catch {
    return null
  }
}
