'use client'

import { useQueries } from '@tanstack/react-query'

import { useAddFavoritesQuery } from '@/app/entities/api/favorites'
import { pokemonDetailQueryOptions } from '@/app/entities/api/pokemons'
import { IPokemon, mapPokemonToCard } from '@/app/entities/models'
import { DashboardLayoutComponent } from '@/app/modules/dashboard'
import { CardComponent } from '@/app/shared/components/card'
import { Link } from '@/pkg/locale'

//page
const Page = () => {
  const { data: favorites } = useAddFavoritesQuery()

  const pokemonQueries = useQueries({
    queries: (favorites ?? []).map((f: { pokemon_id: number }) => pokemonDetailQueryOptions(String(f.pokemon_id))),
  })

  const cards = pokemonQueries.filter((q) => q.data).map((q) => mapPokemonToCard(q.data as IPokemon))

  //render
  return (
    <DashboardLayoutComponent>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {cards.map((item) => (
          <div key={item.name}>
            <Link href={`/items/${item.name}`}>
              <CardComponent data={item} />
            </Link>
          </div>
        ))}
      </div>
    </DashboardLayoutComponent>
  )
}

export default Page
