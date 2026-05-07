// --- helpers ---

export interface INameResource {
  name: string
  url: string
}

export interface IAbility {
  ability: INameResource
  is_hidden: boolean
  slot: number
}

export interface IType {
  slot: number
  type: INameResource
}

export interface IStat {
  base_stat: number
  effort: number
  stat: INameResource
}

export interface ISprites {
  front_default: string | null
  front_shiny: string | null
  other?: {
    'official-artwork'?: {
      front_default: string | null
    }
  }
}

// --- models ---

export interface IPokemon {
  id: number
  name: string
  height?: number
  weight?: number
  abilities?: IAbility[]
  types?: IType[]
  stats?: IStat[]
  sprites?: ISprites
}

export interface IPokemonListResponse {
  count: number
  next: string | null
  previous: string | null
  results: INameResource[]
}

export interface IPokemonSpecies extends INameResource {
  id: number
  base_happiness: number
  capture_rate: number
  color: INameResource
  egg_groups: INameResource[]
  evolution_chain: { url: string }
  flavor_text_entries: Array<{
    flavor_text: string
    language: INameResource
    version: INameResource
  }>
  genera: Array<{
    genus: string
    language: INameResource
  }>
  is_legendary: boolean
  is_mythical: boolean
}

export interface IPokemonTypeResponse {
  id: number
  name: string
  pokemon: Array<{
    pokemon: INameResource
    slot: number
  }>
}

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

