import bcrypt from 'bcryptjs'

import { supabaseAdmin, Tables } from '@/pkg/lib/supabase'

export interface IUser extends Tables<'users'> {}

export const findUserByEmail = async (email: string): Promise<IUser | null> => {
  const { data } = await supabaseAdmin
    .from('users')
    .select('id, name, email, password_hash, created_at')
    .eq('email', email)
    .single()

  //render
  return data
}

export const createUser = async (name: string, email: string, password: string): Promise<IUser> => {
  const password_hash = await bcrypt.hash(password, 10)

  const { data, error } = await supabaseAdmin.from('users').insert({ name, email, password_hash }).select().single()

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
