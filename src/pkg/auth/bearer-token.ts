import { type JWTPayload, jwtVerify } from 'jose'
import { type NextRequest } from 'next/server'

const secret = () => new TextEncoder().encode(process.env.JWT_SECRET ?? 'local-dev-secret')

export async function getBearerPayload(req: NextRequest): Promise<JWTPayload | null> {
  const authHeader = req.headers.get('authorization')

  if (!authHeader?.startsWith('Bearer ')) {
    return null
  }

  const token = authHeader.slice(7)

  try {
    const { payload } = await jwtVerify(token, secret())
    return payload
  } catch {
    return null
  }
}
