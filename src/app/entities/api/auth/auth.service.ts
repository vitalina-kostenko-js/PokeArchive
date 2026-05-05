import bcrypt from 'bcryptjs'

import { getSupabaseAdmin } from '@/pkg/lib/supabase'

import { Database, Tables } from '@/app/entities/models'

export interface IUser extends Tables<'users'> {}

export const findUserByEmail = async (email: string): Promise<IUser | null> => {
  const { data } = await getSupabaseAdmin<Database>()
    .from('users')
    .select('id, name, email, password_hash, created_at')
    .eq('email', email)
    .single()

  //render
  return data
}

export const createUser = async (name: string, email: string, password: string): Promise<IUser> => {
  const password_hash = await bcrypt.hash(password, 10)

  const { data, error } = await getSupabaseAdmin<Database>().from('users').insert({ name, email, password_hash }).select().single()

  if (error) {
    throw error
  }

  //render
  return data
}

export const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
  //render
  return bcrypt.compare(password, hash)
}
