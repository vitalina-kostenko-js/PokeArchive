import { createClient } from '@supabase/supabase-js'

import { envServer } from '@/config/env'

export const getSupabaseAdmin = <T>() => {
  return createClient<T>(
    envServer.SUPABASE_URL,
    envServer.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  )
}