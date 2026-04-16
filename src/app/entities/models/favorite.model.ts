import { IPokemon } from '@/app/entities/models'

export interface IFavoriteItem {
  pokemon_id: number
}

export interface IPokemonCardsQueryResult {
  items: IPokemon[]
  totalCount: number
}
