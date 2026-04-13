'use client'

import { useQueries } from '@tanstack/react-query'

import { Link } from '../../../../../pkg/locale'
import { useAddFacoritesQuery } from '../../../../entities/api/favorites'
import { getPokemonByName } from '../../../../entities/api/pokemons'
import { IPokemon, mapPokemonToCard } from '../../../../entities/models'
import { DashboardLayoutComponent } from '../../../../modules/dashboard'
import { CardComponent } from '../../../../widgets/card'

//inteface
interface IProps {}

//page
const Page = () => {
  const { data: favorites } = useAddFacoritesQuery()

  const pokemonQueries = useQueries({
    queries: (favorites ?? []).map((f: { pokemon_id: number }) => ({
      queryKey: ['pokemon', 'detail', String(f.pokemon_id)],
      queryFn: () => getPokemonByName(String(f.pokemon_id)),
      staleTime: 1000 * 60 * 5,
    })),
  })

  const cards = pokemonQueries.filter((q) => q.data).map((q) => mapPokemonToCard(q.data as IPokemon))

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
