import { ArrowLeft } from 'lucide-react'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { Link } from '../../../../../pkg/locale'
import {
  getEvolutionChain,
  getPokemonByNameOrNull,
  getPokemonSpecies,
} from '../../../../entities/api/pokemons/pokemon.api'
import { flattenEvolutionChain } from '../../../../entities/models'
import { CardProfileComponent } from '../../../../shared/ui/card-profile'
import { PokemonAvatar } from '../../../../shared/ui/pokemon-avatar'
import { DashboardLayoutComponent } from '../../../../widgets/dashboard'

export const dynamic = 'force-dynamic'

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
  if (!pokemon) notFound()

  let species

  try {
    species = await getPokemonSpecies(id)
  } catch {
    notFound()
  }

  let evolutionData

  try {
    evolutionData = await getEvolutionChain(species.evolution_chain.url)
  } catch {
    notFound()
  }

  const evolutionNames = flattenEvolutionChain(evolutionData.chain)

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
          <div className='rounded-3xl border border-gray-100 bg-white p-6 shadow-lg md:col-span-1 dark:border-gray-700 dark:bg-gray-800'>
            <h3 className='mb-6 flex items-center gap-2 text-xl font-bold dark:text-white'>
              <span className='h-6 w-2 rounded-full bg-red-500'></span> {t('baseStats')}
            </h3>

            <div className='space-y-4'>
              {pokemon.stats?.map((stat) => (
                <div key={stat.stat.name}>
                  <div className='mb-1 flex justify-between text-sm capitalize'>
                    <span className='text-gray-600 dark:text-gray-400'>{stat.stat.name.replace('-', ' ')}</span>

                    <span className='font-bold dark:text-white'>{stat.base_stat}</span>
                  </div>

                  <div className='h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700'>
                    <div
                      className='h-full rounded-full bg-blue-500 transition-all duration-1000'
                      style={{ width: `${Math.min((stat.base_stat / 200) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* evolution */}
          <div className='rounded-3xl border border-gray-100 bg-white p-6 shadow-lg md:col-span-2 dark:border-gray-700 dark:bg-gray-800'>
            <h3 className='mb-6 flex items-center gap-2 text-xl font-bold dark:text-white'>
              <span className='h-6 w-2 rounded-full bg-green-500'></span> {t('evolutionChain')}
            </h3>

            <div className='flex flex-wrap items-center justify-around gap-6 py-4'>
              {evolutionNames.map((name, index) => (
                <div key={name} className='flex items-center gap-4'>
                  <PokemonAvatar name={name} size='md' />

                  {index < evolutionNames.length - 1 && (
                    <span className='text-2xl text-gray-300 dark:text-gray-600'>→</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayoutComponent>
  )
}

export default Page
