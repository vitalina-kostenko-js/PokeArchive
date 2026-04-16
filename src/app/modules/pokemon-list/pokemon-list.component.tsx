'use client'

import { FC, useMemo, useState } from 'react'

import { usePokemonCardsByTypeQuery, usePokemonCardsQuery } from '@/app/entities/api/pokemons'
import { IPokemon, IPokemonCardData, mapPokemonToCard } from '@/app/entities/models'
import { TypeFilterComponent } from '@/app/features/type-filter'
import { CardComponent } from '@/app/shared/components/card'
import { PaginationComponent } from '@/app/shared/components/pagination'
import { CARD_SKELETON_MODEL } from '@/app/shared/constants/loading'
import { SkeletonRendererComponent } from '@/app/shared/ui/skeleton-render'
import { Link } from '@/pkg/locale'

import { useTypeFilter } from './pokemon-list.service'

//interface
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

  const { handleTypeChange, isPending } = useTypeFilter()
  const [isPaginationPending, setIsPaginationPending] = useState(false)

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

  //render
  return (
    <>
      {isError && <div>Error loading data</div>}

      <div>
        <TypeFilterComponent selectedType={selectedType ?? null} onTypeChange={handleTypeChange} />
      </div>

      {isLoading || isTypeLoading || isPending || isPaginationPending ? (
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {Array.from({ length: 12 }).map((_, i) => (
            <SkeletonRendererComponent key={i} model={CARD_SKELETON_MODEL} />
          ))}
        </div>
      ) : (
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {displayData.map((item) => (
            <div key={item.name} className='min-h-0'>
              <Link href={`/items/${item.name}`}>
                <CardComponent data={item} />
              </Link>
            </div>
          ))}
        </div>
      )}

      <div className='py-2'>
        <PaginationComponent
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={setIsPaginationPending}
        />
      </div>
    </>
  )
}

export default PokemonListComponent
