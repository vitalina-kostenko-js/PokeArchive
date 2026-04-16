import { INameResource } from './pokemon.model'

export interface IEvolutionDetail {
  trigger: INameResource
  min_level?: number
  item?: INameResource
}

export interface IEvolutionNode {
  species: INameResource
  evolution_details: IEvolutionDetail[]
  evolves_to: IEvolutionNode[]
}

export interface IEvolutionChainResponse {
  id: number
  chain: IEvolutionNode
}
