import Image from 'next/image'
import { FC } from 'react'

import { IPokemon, IPokemonSpecies } from '../../interfaces'
import { useTranslations } from 'next-intl'

interface IProps {
  pokemon: IPokemon
  species: IPokemonSpecies
}

const CardProfileComponent: FC<Readonly<IProps>> = ({ pokemon, species }) => {
  const t = useTranslations('card_profile')
  
  const mainImage = pokemon.sprites?.other?.['official-artwork']?.front_default ?? pokemon.sprites?.front_default ?? ''
  const genus = species.genera.find((g) => g.language.name === 'en')?.genus

  return (
    <div className='rounded-3xl border border-gray-100 bg-white p-8 shadow-xl transition-all hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800'>
      <div className='flex flex-col items-center gap-8 md:flex-row'>
        <div className='group relative'>
          <div className='absolute inset-0 rounded-full bg-blue-500/10 blur-3xl transition-all group-hover:bg-blue-500/20' />
          <Image
            src={mainImage}
            alt={pokemon.name}
            width={256}
            height={256}
            className='relative object-contain drop-shadow-2xl transition-transform duration-300 group-hover:scale-105'
          />
        </div>

        <div className='flex-1 space-y-4 text-center md:text-left'>
          <div>
            <span className='text-sm font-bold tracking-widest text-blue-500 uppercase'>
              #{pokemon.id.toString().padStart(3, '0')}
            </span>
            <h1 className='text-4xl font-black text-gray-900 capitalize md:text-5xl dark:text-white'>{pokemon.name}</h1>
            <p className='text-gray-500 italic dark:text-gray-400'>{genus}</p>
          </div>

          <div className='flex flex-wrap justify-center gap-2 md:justify-start'>
            {pokemon.types?.map((t) => (
              <span
                key={t.type.name}
                className='rounded-full border border-gray-200 bg-gray-100 px-4 py-1 text-sm font-semibold text-gray-700 uppercase dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200'
              >
                {t.type.name}
              </span>
            ))}
          </div>

          <div className='grid grid-cols-2 gap-4 border-t border-gray-100 pt-4 dark:border-gray-700'>
            <div className='text-center md:text-left'>
              <p className='text-xs font-bold text-gray-400 uppercase'>{t('weight')}</p>
              <p className='text-lg font-medium dark:text-white'>{(pokemon.weight ?? 0) / 10} kg</p>
            </div>
            <div className='text-center md:text-left'>
              <p className='text-xs font-bold text-gray-400 uppercase'>{t('height')}</p>
              <p className='text-lg font-medium dark:text-white'>{(pokemon.height ?? 0) / 10} m</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardProfileComponent
