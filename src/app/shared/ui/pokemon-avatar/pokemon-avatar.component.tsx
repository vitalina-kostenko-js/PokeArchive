'use client'

import Image from 'next/image'
import { FC } from 'react'
import { Link } from '../../../../pkg/locale'
import { usePokemonDetailQuery } from '../../../entities/api/pokemons'

interface IProps {
  name: string
  size?: 'sm' | 'md' | 'lg'
}

const PokemonAvatar: FC<Readonly<IProps>> = ({ name, size = 'md' }) => {
  const { data, isLoading, isError } = usePokemonDetailQuery(name)

  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-24 h-24',
    lg: 'w-40 h-40',
  }

  if (isLoading) {
    return <div className={`${sizeClasses[size]} animate-pulse rounded-full bg-gray-200 dark:bg-gray-700`} />
  }

  if (isError || !data) {
    return (
      <div
        className={`${sizeClasses[size]} flex items-center justify-center rounded-full bg-red-100 text-xs text-red-500`}
      >
        Error
      </div>
    )
  }

  const imageUrl = data.sprites?.other?.['official-artwork']?.front_default ?? data.sprites?.front_default ?? ''

  return (
    <Link href={`/items/${name}`} className='group flex flex-col items-center gap-2'>
      <div
        className={`${sizeClasses[size]} flex items-center justify-center rounded-full border-2 border-transparent bg-gray-50 p-2 transition-all duration-300 group-hover:border-blue-500 group-hover:shadow-lg dark:bg-gray-900`}
      >
        <Image
          src={imageUrl}
          alt={name}
          width={160}
          height={160}
          className='h-full w-full transform object-contain transition-transform group-hover:scale-110'
        />
      </div>

      <span className='text-xs font-bold text-gray-500 capitalize transition-colors group-hover:text-blue-600'>
        {name}
      </span>
    </Link>
  )
}

export default PokemonAvatar
