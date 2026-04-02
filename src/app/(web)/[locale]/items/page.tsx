import { dehydrate, QueryClient } from '@tanstack/react-query'
import { getLocale } from 'next-intl/server'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'

import { fetchPokemonCards, pokemonCardsQueryKey } from '@/app/entities/api/pokemons'
import { ReactQueryHydration } from '@/app/shared/providers'
import { authServer } from '@/pkg/auth/server'
import { getPathname } from '@/pkg/locale'

import { DashboardLayoutComponent } from '../../../widgets/dashboard'
import PokemonListComponent from '../../../widgets/pokemon-list/pokemon-list.component'

export const revalidate = 3600

//interface
interface ItemsPageProps {
  searchParams: Promise<{ page?: string }>
}

//page
const ItemsPage = async ({ searchParams }: ItemsPageProps) => {
  const session = await authServer.getSession()
  const user = session.user

  if (!user) {
    const locale = await getLocale()
    redirect(getPathname({ href: '/sign-in', locale }))
  }

  const sp = await searchParams

  const rawPage = Number(sp.page ?? '1')
  const page = Number.isFinite(rawPage) && rawPage >= 1 ? Math.floor(rawPage) : 1
  const itemsPerPage = 12
  const offset = (page - 1) * itemsPerPage

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: pokemonCardsQueryKey(offset, itemsPerPage),
    queryFn: () => fetchPokemonCards(offset, itemsPerPage),
  })

  return (
    <ReactQueryHydration state={dehydrate(queryClient)}>
      <DashboardLayoutComponent>
        <div className='flex flex-1 flex-col gap-6 py-4'>
          <Suspense fallback={<div className='text-muted-foreground text-sm'>Loading…</div>}>
            <PokemonListComponent />
          </Suspense>
        </div>
      </DashboardLayoutComponent>
    </ReactQueryHydration>
  )
}

export default ItemsPage
