import { dehydrate, QueryClient } from '@tanstack/react-query'
import { Suspense } from 'react'

import { fetchPokemonCards, pokemonKeys } from '@/app/entities/api/pokemons'
import { ReactQueryHydration } from '@/app/shared/providers'

import { DashboardLayoutComponent } from '../../../../widgets/dashboard'
import PokemonListComponent from '../../../../widgets/pokemon-list/pokemon-list.component'

export const revalidate = 3600

//interface
interface ItemsPageProps {
  searchParams: Promise<{ page?: string }>
}

//page
const ItemsPage = async ({ searchParams }: ItemsPageProps) => {
  const sp = await searchParams

  const rawPage = Number(sp.page ?? '1')
  const page = Number.isFinite(rawPage) && rawPage >= 1 ? Math.floor(rawPage) : 1
  const itemsPerPage = 12
  const offset = (page - 1) * itemsPerPage

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: pokemonKeys.cards(offset, itemsPerPage),
    queryFn: () => fetchPokemonCards(offset, itemsPerPage),
  })

  return (
    <ReactQueryHydration state={dehydrate(queryClient)}>
      <DashboardLayoutComponent>
        <div className='flex flex-1 flex-col gap-6 py-4'>
          <Suspense fallback={<div className='text-muted-foreground text-sm'>Loading…</div>}>
            <PokemonListComponent page={page} offset={offset} />
          </Suspense>
        </div>
      </DashboardLayoutComponent>
    </ReactQueryHydration>
  )
}

export default ItemsPage
