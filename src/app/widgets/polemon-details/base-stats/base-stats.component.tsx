'use client'
import { useTranslations } from 'next-intl'
import { FC } from 'react'
import { IPokemon } from '../../../entities/models'

//interface
interface IProps {
  pokemon: IPokemon
}

//component
const BaseStatsComponent: FC<Readonly<IProps>> = (props) => {
  const { pokemon } = props

  const t = useTranslations('items_page')

  return (
    <div className='bg-card rounded-3xl border p-6 shadow-lg md:col-span-1'>
      <h3 className='mb-6 flex items-center gap-2 text-xl font-bold dark:text-white'>
        <span className='h-6 w-2 rounded-full bg-red-500'></span> {t('baseStats')}
      </h3>

      <div className='space-y-4'>
        {pokemon.stats?.map((stat) => (
          <div key={stat.stat.name}>
            <div className='mb-1 flex justify-between text-sm capitalize'>
              <span className='text-gray-600 dark:text-gray-400'>{stat.stat.name.replace('-', ' ')}</span>

              <span className='font-bold dark:text-white'>{stat.base_stat}</span>
            </div>

            <div className='h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700'>
              <div
                className='h-full rounded-full bg-blue-500 transition-all duration-1000'
                style={{ width: `${Math.min((stat.base_stat / 200) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BaseStatsComponent
