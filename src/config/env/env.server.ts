
import { z } from 'zod'

import { createEnv } from '@t3-oss/env-nextjs'

// env server
export const envServer = createEnv({
  server: {
    NODE_ENV: z.enum(['development', 'production']).optional().default('development'),
    JWT_SECRET: z.string().nonempty({ message: 'JWT_SECRET is required' }),
    REDIS_URL: z.string().optional(),
    SUPABASE_URL: z.string().url({ message: 'SUPABASE_URL is required' }),
    SUPABASE_SERVICE_ROLE_KEY: z.string().nonempty({ message: 'SUPABASE_SERVICE_ROLE_KEY is required' }),
  },
  emptyStringAsUndefined: true,
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    JWT_SECRET: process.env.JWT_SECRET,
    REDIS_URL: process.env.REDIS_URL,
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  },
})
