import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'

import { getFullPokemonData, getPokemonByName } from '@/app/entities/api/pokemons'
import { BackButtonComponent } from '@/app/features/back-button'
import PokemonDetailsComponent from '@/app/features/pokemon-details/pokemon-details.component'
import { DashboardLayoutComponent } from '@/app/modules/dashboard'
import { CardProfileComponent } from '@/app/shared/components/card-profile'

export const revalidate = 3600

//interface
interface IProps {
  params: Promise<{ id: string }>
}

//metadata
export const generateMetadata = async ({ params }: IProps): Promise<Metadata> => {
  const { id } = await params
  const pokemon = await getPokemonByName(id)

  if (!pokemon) {
    //render
    return {
      title: id.replace(/-/g, ' '),
      description: 'Pokémon not found.',
    }
  }

  const name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)

  //render
  return {
    title: name,
    description: `Pokédex entry: ${name} — stats, types, and evolution chain on PokeArchive.`,
  }
}

//page
const Page = async ({ params }: IProps) => {
  const { id } = await params

  const t = await getTranslations('items_page')

  const pokemon = await getFullPokemonData(id)

  if (!pokemon) {
    notFound()
  }

  const { species } = pokemon

  //render
  return (
    <DashboardLayoutComponent>
      <div className='pb-2'>
        <BackButtonComponent text={t('backToList')} />
      </div>

      <div className='animate-in fade-in slide-in-from-bottom-4 mx-auto max-w-5xl space-y-8 duration-700'>
        <CardProfileComponent pokemon={pokemon} species={species} />

        <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
          <PokemonDetailsComponent pokemon={pokemon} initialUrl={species.evolution_chain.url} />
        </div>
      </div>
    </DashboardLayoutComponent>
  )
}

export default Page
