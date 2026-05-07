'use client'

import { FC, useMemo, useState } from 'react'

import { mapPokemonToCard, usePokemonCardsByTypeQuery, usePokemonCardsQuery } from '@/app/entities/api/pokemons'
import { IPokemon } from '@/app/entities/models'
import { CardListComponent } from '@/app/shared/components/card-list'
import { PaginationComponent } from '@/app/shared/components/pagination'
import { SkeletonRendererComponent } from '@/app/shared/components/skeleton-render'
import { TypeFilterComponent } from '@/app/shared/components/type-filter'
import { CARD_SKELETON_MODEL } from '@/app/shared/constants/loading'
import { Link } from '@/pkg/locale'

import { useTypeFilter } from './pokemon-list.service'

//interface
interface IProps {
  dataPokemons?: IPokemon[]
  page: number
  offset: number
  selectedType?: string | null
}

//component
const PokemonListComponent: FC<Readonly<IProps>> = (props) => {
  const { dataPokemons, offset: listOffset, selectedType } = props
  const itemsPerPage = 12

  const { handleTypeChange, isPending } = useTypeFilter()
  const [isPaginationPending, setIsPaginationPending] = useState(false)

  const { data: allData, isLoading, isError } = usePokemonCardsQuery(listOffset, itemsPerPage, !dataPokemons)

  const { data: typeData } = usePokemonCardsByTypeQuery(selectedType ?? null, listOffset, itemsPerPage)

  const displayData = useMemo(() => {
    if (dataPokemons) {
      //render
      return dataPokemons.map(mapPokemonToCard)
    }

    if (selectedType && typeData) {
      //render
      return typeData.items.map(mapPokemonToCard)
    }

    //render
    return (allData?.items ?? []).map(mapPokemonToCard)
  }, [dataPokemons, allData, selectedType, typeData])

  const totalItems = selectedType
    ? (typeData?.totalCount ?? 0)
    : dataPokemons
      ? dataPokemons.length
      : (allData?.totalCount ?? 0)

  //render
  return (
    <div>
      {isError && <div>Error loading data</div>}

      <div>
        <TypeFilterComponent selectedType={selectedType ?? null} onTypeChange={handleTypeChange} />
      </div>

      {isLoading || isPending || isPaginationPending ? (
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
                <CardListComponent data={item} />
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
    </div>
  )
}

export default PokemonListComponent
