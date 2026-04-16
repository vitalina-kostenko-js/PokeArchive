import { supabaseAdmin } from '@/pkg/lib/supabase'

export const getUserFavorites = async (userId: string) => {
  const { data, error } = await supabaseAdmin
    .from('favorites')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) {
    throw error
  }

  //render
  return data
}

export const addFavorite = async (userId: string, pokemon_id: number) => {
  const { data, error } = await supabaseAdmin
    .from('favorites')
    .insert({
      user_id: userId,
      pokemon_id: pokemon_id,
    })
    .select()
    .single()

  if (error) {
    throw error
  }

  //render
  return data
}

export const removeFavorite = async (userId: string, pokemon_id: number) => {
  const { error } = await supabaseAdmin.from('favorites').delete().eq('user_id', userId).eq('pokemon_id', pokemon_id)

  if (error) {
    throw error
  }
}
