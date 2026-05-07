import { IPokemon, IPokemonCardData } from '@/app/entities/models'

// map pokemon to card
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
