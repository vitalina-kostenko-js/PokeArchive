import { INameResource } from './pokemon.model'

export interface IItemEffect {
  effect: string
  short_effect: string
  language: INameResource
}

export interface IItem extends INameResource {
  id: number
  cost: number
  attributes: INameResource[]
  category: INameResource
  effect_entries: IItemEffect[]
  sprites: {
    default: string
  }
}
