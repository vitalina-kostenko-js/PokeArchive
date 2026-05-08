import { IFavoriteItem } from '@/app/entities/models'
import { restApiFetcher } from '@/pkg/rest-api'

//get favorites
export const getFavorites = async (): Promise<IFavoriteItem[]> => {
  const res = await restApiFetcher.get('api/favorites', { credentials: 'include' })
  const data = await res.json<IFavoriteItem[] | { error: string }>()

  if (!res.ok) {
    throw new Error((data as { error: string }).error ?? 'Failed to fetch favorites')
  }

  //render
  return data as IFavoriteItem[]
}

//add favorite
export const addFavorite = async (pokemonId: number): Promise<void> => {
  const res = await restApiFetcher.post('api/favorites', {
    json: { pokemonId },
    credentials: 'include',
  })

  if (!res.ok) {
    const data = await res.json<{ error: string }>()

    throw new Error(data.error ?? 'Failed to add favorite')
  }
}

//remove favorite
export const removeFavorite = async (pokemonId: number): Promise<void> => {
  const res = await restApiFetcher.delete('api/favorites', {
    json: { pokemonId },
    credentials: 'include',
  })

  if (!res.ok) {
    const data = await res.json<{ error: string }>()

    throw new Error(data.error ?? 'Failed to remove favorite')
  }
}
