import ky, { type KyInstance } from 'ky'

//fetchers
export const pokeApiFetcher: KyInstance = ky.create({
  prefixUrl: 'https://pokeapi.co/api/v2',
})
