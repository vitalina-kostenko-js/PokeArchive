import type {
  IEvolutionChainResponse,
  IPokemon,
  IPokemonListResponse,
  IPokemonSpecies,
  IPokemonTypeResponse,
} from '@/app/entities/models'

const API_URL = 'https://pokeapi.co/api/v2'

export const getPokemonList = async (offset = 0, limit = 20, signal?: AbortSignal): Promise<IPokemonListResponse> => {
  const res = await fetch(`${API_URL}/pokemon?offset=${offset}&limit=${limit}`, {
    cache: 'force-cache',
    next: { revalidate: 3600 },
    signal,
  })

  if (!res.ok) {
    throw new Error('Network response was not ok')
  }

  return res.json()
}

export const getPokemonByName = async (name: string, signal?: AbortSignal): Promise<IPokemon> => {
  const res = await fetch(`${API_URL}/pokemon/${encodeURIComponent(name)}`, {
    cache: 'force-cache',
    next: { revalidate: 3600 },
    signal,
  })

  if (!res.ok) {
    throw new Error('Network response was not ok')
  }
  return res.json()
}

export const getPokemonByNameOrNull = async (name: string): Promise<IPokemon | null> => {
  const res = await fetch(`${API_URL}/pokemon/${encodeURIComponent(name)}`, {
    cache: 'force-cache',
    next: { revalidate: 3600 },
  })

  if (res.status === 404) {
    return null
  }

  if (!res.ok) {
    throw new Error('Network response was not ok')
  }

  return res.json()
}

export const getPokemonSpecies = async (name: string): Promise<IPokemonSpecies> => {
  const res = await fetch(`${API_URL}/pokemon-species/${encodeURIComponent(name)}`, {
    cache: 'force-cache',
    next: { revalidate: 3600 },
  })

  if (!res.ok) {
    throw new Error('Species not found')
  }

  return res.json()
}

export const getEvolutionChain = async (url: string): Promise<IEvolutionChainResponse> => {
  const parsed = new URL(url)

  if (parsed.hostname !== 'pokeapi.co') {
    throw new Error('Invalid evolution chain URL')
  }

  const res = await fetch(url, {
    cache: 'force-cache',
    next: { revalidate: 3000 },
  })

  if (!res.ok) {
    throw new Error('Evolution chain not found')
  }

  return res.json()
}

export const getPokemonByType = async (typeName: string, signal?: AbortSignal): Promise<IPokemonTypeResponse> => {
  const res = await fetch(`${API_URL}/type/${encodeURIComponent(typeName)}`, {
    cache: 'force-cache',
    next: { revalidate: 3600 },
    signal,
  })

  if (!res.ok) {
    throw new Error('Type noot found')
  }

  return res.json()
}

export const getFullPokemonData = async (id: string) => {
  try {
    const [pokemon, species] = await Promise.all([getPokemonByNameOrNull(id), getPokemonSpecies(id)])

    if (!pokemon) {
      return null
    }

    return { ...pokemon, species }
  } catch {
    return null
  }
}
