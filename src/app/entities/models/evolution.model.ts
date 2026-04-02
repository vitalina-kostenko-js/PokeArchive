import { INameResource } from '../../shared/interfaces'

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

export const flattenEvolutionChain = (node: IEvolutionNode): string[] => {
  const names = [node.species.name]

  node.evolves_to.forEach((evolution) => {
    names.push(...flattenEvolutionChain(evolution))
  })

  return names
}
