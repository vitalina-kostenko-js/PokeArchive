'use client'

import { FC, useMemo } from 'react'

import { usePokemonCardsByTypeQuery, usePokemonCardsQuery } from '@/app/entities/api/pokemons'
import { IPokemon, IPokemonCardData, mapPokemonToCard } from '@/app/entities/models'
import { CardComponent } from '@/app/widgets/card'

import { useTypeFilter } from './pokemon-list.service'

import { Link } from '../../../pkg/locale'
import { PaginationComponent } from '../pagination'
import { TypeFilterComponent } from '../type-filter'

//inteface
interface IPokemonListComponentProps {
  dataPokemons?: IPokemon[]
  page: number
  offset: number
  selectedType?: string | null
}

//component
const PokemonListComponent: FC<Readonly<IPokemonListComponentProps>> = (props) => {
  const { dataPokemons, page: currentPage, offset: listOffset, selectedType } = props
  const itemsPerPage = 12

  const { handleTypeChange } = useTypeFilter()

  const { data: allData, isLoading, isError } = usePokemonCardsQuery(listOffset, itemsPerPage, !dataPokemons)

  const {
    data: typeData,
    isLoading: isTypeLoading,
    isError: isTypeError,
  } = usePokemonCardsByTypeQuery(selectedType ?? null, listOffset, itemsPerPage)

  const displayData = useMemo<IPokemonCardData[]>(() => {
    if (dataPokemons) {
      return dataPokemons.map(mapPokemonToCard)
    }

    if (selectedType && typeData) {
      return typeData.items.map(mapPokemonToCard)
    }

    return (allData?.items ?? []).map(mapPokemonToCard)
  }, [dataPokemons, allData, selectedType, typeData])

  const totalItems = selectedType
    ? (typeData?.totalCount ?? 0)
    : dataPokemons
      ? dataPokemons.length
      : (allData?.totalCount ?? 0)

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error loading data</div>}

      <div className='py-2'>
        <PaginationComponent totalItems={totalItems} itemsPerPage={itemsPerPage} />
      </div>

      <div>
        <TypeFilterComponent selectedType={selectedType ?? null} onTypeChange={handleTypeChange} />
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

      <div className='py-2'>
        <PaginationComponent totalItems={totalItems} itemsPerPage={itemsPerPage} />
      </div>
    </>
  )
}

export default PokemonListComponent
