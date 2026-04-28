import { IFavoriteItem } from '@/app/entities/models'
import { restApiFetcher } from '@/pkg/rest-api'

//get favorites
export const getFavorites = async (): Promise<IFavoriteItem[]> => {
  //render
  return restApiFetcher.get('api/favorites', { credentials: 'include' }).json()
}

//add favorite
export const addFavorite = async (pokemonId: number) => {
  //render
  return restApiFetcher
    .post('api/favorites', {
      json: { pokemonId },
      credentials: 'include',
    })
    .json()
}

//remove favorite
export const removeFavorite = async (pokemonId: number) => {
  //render
  return restApiFetcher
    .delete('api/favorites', {
      json: { pokemonId },
      credentials: 'include',
    })
    .json()
}
