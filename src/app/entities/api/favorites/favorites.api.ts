import { IFavoriteItem } from '@/app/entities/models'
import { restApiFetcher } from '@/pkg/rest-api'

export const getFavorites = async (): Promise<IFavoriteItem[]> => {
  return restApiFetcher.get('api/favorites', { credentials: 'include' }).json()
}

export const addFavorite = async (pokemonId: number) => {
  return restApiFetcher
    .post('api/favorites', {
      json: { pokemonId },
      credentials: 'include',
    })
    .json()
}

export const removeFavorite = async (pokemonId: number) => {
  return restApiFetcher
    .delete('api/favorites', {
      json: { pokemonId },
      credentials: 'include',
    })
    .json()
}
