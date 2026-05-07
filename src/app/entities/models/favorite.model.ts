import { IPokemon } from '@/app/entities/models'

//interface
export interface IFavoriteItem {
  pokemon_id: number
}

export interface IPokemonCardsQueryResult {
  items: IPokemon[]
  totalCount: number
}
