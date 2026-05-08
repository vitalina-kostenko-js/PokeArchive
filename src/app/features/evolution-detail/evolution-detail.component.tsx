'use client'
import { useQueries } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { FC } from 'react'

import { pokemonDetailQueryOptions, usePokemonEvolutionQuery } from '@/app/entities/api/pokemons'
import { flattenEvolutionChain } from '@/app/features/evolution-detail/evolution-detail.service'
import { PokemonAvatarComponent } from '@/app/shared/components/pokemon-avatar'

//interface
interface IProps {
  initialUrl: string
}

//component
const EvolutionDetailComponent: FC<Readonly<IProps>> = (props) => {
  const { initialUrl } = props

  const t = useTranslations('items_page')

  const { data: evolutionData } = usePokemonEvolutionQuery(initialUrl)

  const evolutionNames = evolutionData ? flattenEvolutionChain(evolutionData.chain) : []

  const pokemonQueries = useQueries({
    queries: evolutionNames.map((name) => pokemonDetailQueryOptions(name)),
  })

  if (!evolutionData) {
    //render
    return null
  }

  //render
  return (
    <div className='rounded-3xl border border-gray-100 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800'>
      <h3 className='mb-6 flex items-center gap-2 text-xl font-bold dark:text-white'>
        <span className='h-6 w-2 rounded-full bg-green-500'></span> {t('evolutionChain')}
      </h3>

      <div className='flex flex-wrap items-center justify-around gap-6 py-4'>
        {evolutionNames.map((name, index) => {
          const query = pokemonQueries[index]
          const imageUrl =
            query?.data?.sprites?.other?.['official-artwork']?.front_default ??
            query?.data?.sprites?.front_default ??
            undefined

          //render
          return (
            <div key={name} className='flex items-center gap-4'>
              <PokemonAvatarComponent
                name={name}
                imageUrl={imageUrl}
                isLoading={query?.isLoading}
                isError={query?.isError}
                size='md'
              />

              {index < evolutionNames.length - 1 && (
                <span className='text-2xl text-gray-300 dark:text-gray-600'>→</span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default EvolutionDetailComponent
