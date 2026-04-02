'use client'

import { useSearchParams } from 'next/navigation'
import { FC, useMemo } from 'react'

import { usePokemonCardsQuery } from '@/app/entities/api/pokemons'
import { IPokemon, IPokemonCardData } from '@/app/shared/interfaces'
import { CardComponent } from '@/app/shared/ui/card'

import { Link } from '../../../pkg/locale'
import { mapPokemonToCard } from '../../entities/models'
import { PaginationComponent } from '../pagination'

interface PokemonListComponentProps {
  dataPokemons?: IPokemon[]
  page?: number
}

const PokemonListComponent: FC<Readonly<PokemonListComponentProps>> = (props) => {
  const { dataPokemons, page: pageProp } = props
  const itemsPerPage = 12

  const searchParams = useSearchParams()

  const urlPage = Number(searchParams.get('page') || '1')
  const pageFromUrl = Number.isFinite(urlPage) && urlPage >= 1 ? Math.floor(urlPage) : 1
  const currentPage = pageProp ?? pageFromUrl
  const listOffset = (currentPage - 1) * itemsPerPage

  const { data: fetchedData, isLoading, isError } = usePokemonCardsQuery(listOffset, itemsPerPage, !dataPokemons)

  const displayData = useMemo<IPokemonCardData[]>(() => {
    if (dataPokemons) {
      return dataPokemons.map(mapPokemonToCard)
    }

    return (fetchedData?.items ?? []).map(mapPokemonToCard)
  }, [dataPokemons, fetchedData])

  const paginatedData = useMemo(() => {
    if (!Array.isArray(displayData)) return []
    if (dataPokemons) {
      const start = (currentPage - 1) * itemsPerPage
      return displayData.slice(start, start + itemsPerPage)
    }
    return displayData
  }, [dataPokemons, displayData, currentPage, itemsPerPage])

  const totalItems = dataPokemons ? dataPokemons.length : (fetchedData?.totalCount ?? 0)

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error loading data</div>}

      <div className='py-2'>
        <PaginationComponent totalItems={totalItems} itemsPerPage={itemsPerPage} />
      </div>

      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {paginatedData.map((item) => (
          <div key={item.name} className='min-h-0'>
            <Link href={`/items/${item.name}`}>
              <CardComponent data={item} />
            </Link>
          </div>
        ))}
      </div>
    </>
  )
}

export default PokemonListComponent
