'use client'

import Image from 'next/image'
import { FC } from 'react'

import { sizeClasses } from '@/app/shared/components/pokemon-avatar/pokemon-avatar.constanta'
import { Link } from '@/pkg/locale'

//interface
interface IProps {
  name: string
  imageUrl?: string
  isLoading?: boolean
  isError?: boolean
  size?: 'sm' | 'md' | 'lg'
}

//component
const PokemonAvatarComponent: FC<Readonly<IProps>> = ({ name, imageUrl, isLoading, isError, size = 'md' }) => {
  if (isLoading) {
    //render
    return <div className={`${sizeClasses[size]} animate-pulse rounded-full bg-gray-200 dark:bg-gray-700`} />
  }

  if (isError || !imageUrl) {
    //render
    return (
      <div
        className={`${sizeClasses[size]} flex items-center justify-center rounded-full bg-red-100 text-xs text-red-500`}
      >
        Error
      </div>
    )
  }

  //render
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

export default PokemonAvatarComponent
