import { createClient } from '@supabase/supabase-js'

import { envServer } from '@/config/env'

import { Database } from './database.types'

export const supabaseAdmin = createClient<Database>(envServer.SUPABASE_URL, envServer.SUPABASE_SERVICE_ROLE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})
