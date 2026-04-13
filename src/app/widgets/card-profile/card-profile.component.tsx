import { FC } from 'react'

import { IPokemon, IPokemonSpecies } from '@/app/entities/models'

import {
  ProfileAvatarComponent,
  ProfileIdentityComponent,
  ProfileStatsComponent,
  ProfileTypeComponent,
} from './elements'

import { FavoriteButtonComponent } from '../../features/favorite-button'

//interface
interface IProps {
  pokemon: IPokemon
  species: IPokemonSpecies
}

//component
const CardProfileComponent: FC<Readonly<IProps>> = (props) => {
  const { pokemon, species } = props

  const mainImage = pokemon.sprites?.other?.['official-artwork']?.front_default ?? pokemon.sprites?.front_default ?? ''
  const genus = species.genera.find((g) => g.language.name === 'en')?.genus

  return (
    <div className='rounded-3xl border border-gray-100 bg-white p-8 shadow-xl transition-all hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800'>
      <div className='flex flex-col items-center gap-8 md:flex-row'>
        <ProfileAvatarComponent mainImage={mainImage} pokemon={pokemon.name} />

        <div className='flex-1 space-y-4 text-center md:text-left'>
          <ProfileIdentityComponent id={pokemon.id} name={pokemon.name} genus={genus} />

          <ProfileTypeComponent types={pokemon.types} />

          <ProfileStatsComponent weight={pokemon.weight} height={pokemon.height} />
        </div>
      </div>

      <FavoriteButtonComponent pokemonId={pokemon.id} />
    </div>
  )
}

export default CardProfileComponent
