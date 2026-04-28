import { createClient } from '@supabase/supabase-js'

import { Database } from '@/app/entities/dto'
import { envServer } from '@/config/env'

export const getSupabaseAdmin = () => {
  return createClient<Database>(
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
