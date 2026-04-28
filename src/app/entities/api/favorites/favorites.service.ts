import { getSupabaseAdmin } from '@/pkg/lib/supabase'

export const findFavoritesByUser = async (userId: string) => {
  const { data, error } = await getSupabaseAdmin()
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

export const createFavorite = async (userId: string, pokemon_id: number) => {
  const { data, error } = await getSupabaseAdmin()
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

export const deleteFavorite = async (userId: string, pokemon_id: number) => {
  const { error } = await getSupabaseAdmin().from('favorites').delete().eq('user_id', userId).eq('pokemon_id', pokemon_id)

  if (error) {
    throw error
  }
}
