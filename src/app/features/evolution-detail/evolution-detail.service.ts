import { IEvolutionNode } from '@/app/entities/models'

export const flattenEvolutionChain = (node: IEvolutionNode): string[] => {
  const names = [node.species.name]

  node.evolves_to.forEach((evolution) => {
    names.push(...flattenEvolutionChain(evolution))
  })

  //render
  return names
}
