'use client'

import { FC, useMemo } from 'react'

import { usePokemonCardsQuery } from '@/app/entities/api/pokemons'
import { IPokemon, IPokemonCardData, mapPokemonToCard } from '@/app/entities/models'
import { CardComponent } from '@/app/widgets/card'

import { Link } from '../../../pkg/locale'
import { PaginationComponent } from '../pagination'

//inteface
interface IPokemonListComponentProps {
  dataPokemons?: IPokemon[]
  page: number
  offset: number
}

//component
const PokemonListComponent: FC<Readonly<IPokemonListComponentProps>> = (props) => {
  const { dataPokemons, page: currentPage, offset: listOffset } = props
  const itemsPerPage = 12

  const { data: fetchedData, isLoading, isError } = usePokemonCardsQuery(listOffset, itemsPerPage, !dataPokemons)

  const displayData = useMemo<IPokemonCardData[]>(() => {
    if (dataPokemons) {
      return dataPokemons.map(mapPokemonToCard)
    }

    return (fetchedData?.items ?? []).map(mapPokemonToCard)
  }, [dataPokemons, fetchedData])

  // const paginatedData = useMemo(() => {
  //   if (!Array.isArray(displayData)) return []
  //   if (dataPokemons) {
  //     const start = (currentPage - 1) * itemsPerPage
  //     return displayData.slice(start, start + itemsPerPage)
  //   }
  //   return displayData
  // }, [dataPokemons, displayData, currentPage, itemsPerPage])

  const totalItems = dataPokemons ? dataPokemons.length : (fetchedData?.totalCount ?? 0)

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error loading data</div>}

      <div className='py-2'>
        <PaginationComponent totalItems={totalItems} itemsPerPage={itemsPerPage} />
      </div>

      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {displayData.map((item) => (
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
