import { NextPage } from 'next'

import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

import { pokemonCardsByTypeQueryOptions, pokemonCardsQueryOptions } from '@/app/entities/api/pokemons'
import { PokemonListComponent } from '@/app/modules/pokemon-list'
import { getQueryClient } from '@/pkg/rest-api/service'

export const revalidate = 3600

//interface
interface IProps {
  searchParams: Promise<{ page?: string; type?: string }>
}

//page
const Page: NextPage<Readonly<IProps>> = async (props) => {
  const { searchParams } = props

  const sp = await searchParams
  const selectedType = sp.type ?? null

  const rawPage = Number(sp.page ?? '1')
  const page = Number.isFinite(rawPage) && rawPage >= 1 ? Math.floor(rawPage) : 1
  const itemsPerPage = 12
  const offset = (page - 1) * itemsPerPage

  const queryClient = getQueryClient()

  if (selectedType) {
    await queryClient.prefetchQuery(pokemonCardsByTypeQueryOptions(selectedType, offset, itemsPerPage))
  } else {
    await queryClient.prefetchQuery(pokemonCardsQueryOptions(offset, itemsPerPage))
  }

  //render
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className='flex flex-1 flex-col gap-6 py-4'>
        <PokemonListComponent page={page} offset={offset} selectedType={selectedType} />
      </div>
    </HydrationBoundary>
  )
}

export default Page
