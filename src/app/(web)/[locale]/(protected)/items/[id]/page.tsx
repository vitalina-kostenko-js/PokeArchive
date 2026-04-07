import { ArrowLeft } from 'lucide-react'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { Link } from '../../../../../../pkg/locale'
import { getPokemonByNameOrNull, getPokemonSpecies } from '../../../../../entities/api/pokemons/pokemon.api'
import { CardProfileComponent } from '../../../../../widgets/card-profile'
import { DashboardLayoutComponent } from '../../../../../widgets/dashboard'
import { BaseStatsComponent } from '../../../../../widgets/polemon-details/base-stats'
import { EvolutionDetailComponent } from '../../../../../widgets/polemon-details/evolution-delail'

export const revalidate = 3600

//interface
interface IProps {
  params: Promise<{ id: string }>
}

//metadata
export const generateMetadata = async ({ params }: IProps): Promise<Metadata> => {
  const { id } = await params
  const pokemon = await getPokemonByNameOrNull(id)

  if (!pokemon) {
    return {
      title: id.replace(/-/g, ' '),
      description: 'Pokémon not found.',
    }
  }

  const name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)

  return {
    title: name,
    description: `Pokédex entry: ${name} — stats, types, and evolution chain on PokeArchive.`,
  }
}

//page
const Page = async ({ params }: IProps) => {
  const { id } = await params
  const t = await getTranslations('items_page')

  const pokemon = await getPokemonByNameOrNull(id)
  if (!pokemon) {
    notFound()
  }

  let species

  try {
    species = await getPokemonSpecies(id)
  } catch {
    notFound()
  }

  return (
    <DashboardLayoutComponent>
      <div className='pb-2'>
        <Link href='/items'>
          <button className='inline-flex cursor-pointer items-center gap-1'>
            <ArrowLeft size={20} /> {t('backToList')}
          </button>
        </Link>
      </div>

      <div className='animate-in fade-in slide-in-from-bottom-4 mx-auto max-w-5xl space-y-8 duration-700'>
        <CardProfileComponent pokemon={pokemon} species={species} />

        <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
          <BaseStatsComponent pokemon={pokemon} />

          <EvolutionDetailComponent initialUrl={species.evolution_chain.url} />
        </div>
      </div>
    </DashboardLayoutComponent>
  )
}

export default Page
