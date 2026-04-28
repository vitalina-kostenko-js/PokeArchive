import ky, { type KyInstance } from 'ky'

// cached fetch
function cachedFetch(input: RequestInfo | URL, init?: RequestInit) {
  return fetch(input, { ...init, cache: 'force-cache', next: { revalidate: 3600 } } as RequestInit)
}

export const pokeApiFetcher: KyInstance = ky.create({
  prefixUrl: 'https://pokeapi.co/api/v2',
  fetch: cachedFetch,
})
