import { IAbility, IPokemon, IStat, IType } from '../../shared/interfaces'

//interface
export interface IPokemonCardData {
  id: string
  name: string
  sprite: string
  types: IType[]
  height?: number
  weight?: number
  abilities?: IAbility[]
  stats?: IStat[]
}

//mapper
export const mapPokemonToCard = (pokemon: IPokemon): IPokemonCardData => ({
  id: String(pokemon.id),
  name: pokemon.name,
  sprite: pokemon.sprites?.other?.['official-artwork']?.front_default ?? pokemon.sprites?.front_default ?? '',
  types: pokemon.types ?? [],
  height: pokemon.height,
  weight: pokemon.weight,
  abilities: pokemon.abilities ?? [],
  stats: pokemon.stats ?? [],
})
