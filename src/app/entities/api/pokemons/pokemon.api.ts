import ky from 'ky'

import type {
  IEvolutionChainResponse,
  IPokemon,
  IPokemonListResponse,
  IPokemonSpecies,
  IPokemonTypeResponse,
} from '@/app/entities/models'
import { pokeApiFetcher } from './pokeapi.fetcher'

// get list
export const getPokemonList = async (offset = 0, limit = 20): Promise<IPokemonListResponse> => {
  //render
  return pokeApiFetcher.get('pokemon', { searchParams: { offset, limit } }).json()
}

// get by name
export const getPokemonByName = async (name: string): Promise<IPokemon> => {
  //render
  return pokeApiFetcher.get(`pokemon/${encodeURIComponent(name)}`).json()
}

//get species
export const getPokemonSpecies = async (name: string): Promise<IPokemonSpecies> => {
  //render
  return pokeApiFetcher.get(`pokemon-species/${encodeURIComponent(name)}`).json()
}

//get evolution chain 
export const getEvolutionChain = async (url: string): Promise<IEvolutionChainResponse> => {
  const parsed = new URL(url)

  if (parsed.hostname !== 'pokeapi.co') {
    throw new Error('Invalid evolution chain URL')
  }

  //render
  return ky.get(url).json()
}

//get pokemon by type
export const getPokemonByType = async (typeName: string): Promise<IPokemonTypeResponse> => {
  //render
  return pokeApiFetcher(`type/${encodeURIComponent(typeName)}`).json()
}

//get full pokemon data
export const getFullPokemonData = async (id: string) => {
  try {
    const [pokemon, species] = await Promise.all([getPokemonByName(id), getPokemonSpecies(id)])

    if (!pokemon) {
      //render
      return null
    }

    //render
    return { ...pokemon, species }
  } catch {
    //render
    return null
  }
}
