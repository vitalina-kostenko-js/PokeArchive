import { jwtVerify } from 'jose'
import { cookies } from 'next/headers'

import 'server-only'

const secret = new TextEncoder().encode(process.env.JWT_SECRET ?? 'local-dev-secret')

// auth server
export const authServer = {
  // get session from local cookie
  getSession: async () => {
    try {
      const cookieStore = await cookies()
      const token = cookieStore.get('auth-token')?.value

      if (!token) return { user: null, session: null }

      const { payload } = await jwtVerify(token, secret)

      return {
        user: { id: payload.id, name: payload.name, email: payload.email },
        session: { token },
      }
    } catch {
      return { user: null, session: null }
    }
  },

  // get cache token (legacy - reads same cookie)
  getCacheSession: async () => {
    try {
      const cookieStore = await cookies()
      const token = cookieStore.get('auth-token')?.value

      if (!token) return { user: null, session: null }

      const { payload } = await jwtVerify(token, secret)
      return payload
    } catch {
      return { user: null, session: null }
    }
  },
}
