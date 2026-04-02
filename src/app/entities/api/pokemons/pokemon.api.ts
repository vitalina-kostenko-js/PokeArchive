import type { IPokemon, IPokemonListResponse, IPokemonSpecies } from '@/app/shared/interfaces'
import { IEvolutionChainResponse } from '../../models'

const API_URL = 'https://pokeapi.co/api/v2'

export const getPokemonList = async (offset = 0, limit = 20): Promise<IPokemonListResponse> => {
  const res = await fetch(`${API_URL}/pokemon?offset=${offset}&limit=${limit}`, {
    next: { revalidate: 3000 },
  })

  if (!res.ok) throw new Error('Network response was not ok')
  return res.json()
}

export const getPokemonByName = async (name: string): Promise<IPokemon> => {
  const res = await fetch(`${API_URL}/pokemon/${encodeURIComponent(name)}`, {
    next: { revalidate: 3000 },
  })

  if (!res.ok) throw new Error('Network response was not ok')
  return res.json()
}

export const getPokemonByNameOrNull = async (name: string): Promise<IPokemon | null> => {
  const res = await fetch(`${API_URL}/pokemon/${encodeURIComponent(name)}`, {
    next: { revalidate: 3000 },
  })

  if (res.status === 404) return null
  if (!res.ok) throw new Error('Network response was not ok')
  return res.json()
}

export const getPokemonSpecies = async (name: string): Promise<IPokemonSpecies> => {
  const res = await fetch(`${API_URL}/pokemon-species/${encodeURIComponent(name)}`, {
    next: { revalidate: 3000 },
  })

  if (!res.ok) throw new Error('Species not found')
  return res.json()
}

export const getEvolutionChain = async (url: string): Promise<IEvolutionChainResponse> => {
  const res = await fetch(url, {
    next: { revalidate: 3000 },
  })

  if (!res.ok) throw new Error('Evolution chain not found')
  return res.json()
}
