import { FC } from 'react'

import { IPokemon } from '@/app/entities/models'
import { BaseStatsComponent } from '@/app/features/pokemon-details/elements/base-stats'
import { EvolutionDetailComponent } from '@/app/features/pokemon-details/elements/evolution-detail'

//interface
interface IProps {
  pokemon: IPokemon
  initialUrl: string
}

//component
const PokemonDetailsComponent: FC<Readonly<IProps>> = (props) => {
  const { pokemon, initialUrl } = props

  //render
  return (
    <>
      <BaseStatsComponent pokemon={pokemon} />
      <EvolutionDetailComponent initialUrl={initialUrl} />
    </>
  )
}

export default PokemonDetailsComponent
