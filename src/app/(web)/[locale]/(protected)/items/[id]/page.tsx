import type { Metadata, NextPage } from 'next'
import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'

import { getFullPokemonData, getPokemonByName } from '@/app/entities/api/pokemons'
import { BaseStatsComponent } from '@/app/features/base-stats'
import { CardProfileComponent } from '@/app/features/card-profile'
import { EvolutionDetailComponent } from '@/app/features/evolution-detail'
import { BackButtonComponent } from '@/app/shared/components/back-button'

export const revalidate = 3600

//interface
interface IProps {
  params: Promise<{ id: string }>
}

//metadata
export const generateMetadata = async (props: Readonly<IProps>): Promise<Metadata> => {
  const { params } = props

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
const Page: NextPage<Readonly<IProps>> = async (props) => {
  const { params } = props

  const { id } = await params

  const t = await getTranslations('items_page')

  const pokemon = await getFullPokemonData(id)

  if (!pokemon) {
    notFound()
  }

  //render
  return (
    <>
      <div className='pb-2'>
        <BackButtonComponent text={t('backToList')} />
      </div>

      <div className='animate-in fade-in slide-in-from-bottom-4 mx-auto max-w-3xl space-y-8 duration-700'>
        <CardProfileComponent pokemon={pokemon} species={pokemon.species} />

        <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
          <BaseStatsComponent pokemon={pokemon} />
          <EvolutionDetailComponent initialUrl={pokemon.species.evolution_chain.url} />
        </div>
      </div>
    </>
  )
}

export default Page
