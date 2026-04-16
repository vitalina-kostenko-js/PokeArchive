import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

//rate limit
export const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),

  limiter: Ratelimit.slidingWindow(10, '10 s'),
})

export const authRateLimit = new Ratelimit({
  redis: Redis.fromEnv(),

  limiter: Ratelimit.slidingWindow(5, '10 s'),

  prefix: 'ratelimit:auth',
})
