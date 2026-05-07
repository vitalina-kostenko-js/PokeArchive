import { IPokemon } from '@/app/entities/models'

export const favoritesKeys = {
  all: ['favorites'] as const,

  list: (userId?: string) => [...favoritesKeys.all, 'list', userId] as const,
}

//interface
export interface IFavoriteItem {
  pokemon_id: number
}

export interface IPokemonCardsQueryResult {
  items: IPokemon[]
  totalCount: number
}
