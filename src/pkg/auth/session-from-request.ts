import { jwtVerify, type JWTPayload } from 'jose'
import { type NextRequest } from 'next/server'

const secret = () => new TextEncoder().encode(process.env.JWT_SECRET ?? 'local-dev-secret')

/** Edge-safe session read for middleware (no `server-only` / `cookies()` from next/headers). */
export async function getSessionPayloadFromRequest(req: NextRequest): Promise<JWTPayload | null> {
  const token = req.cookies.get('auth-token')?.value
  if (!token) return null
  try {
    const { payload } = await jwtVerify(token, secret())
    return payload
  } catch {
    return null
  }
}
