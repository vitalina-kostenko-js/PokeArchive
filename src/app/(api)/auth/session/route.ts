import { jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

const JWT_SECRET = process.env.JWT_SECRET

if (!JWT_SECRET && process.env.NODE_ENV === 'production') {
  throw new Error('JWT_SECRET must be set in production')
}

const secret = new TextEncoder().encode(JWT_SECRET ?? 'local-dev-secret')

export async function GET() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('auth-token')?.value

    if (!token) {
      return NextResponse.json({ user: null, session: null })
    }

    const { payload } = await jwtVerify(token, secret)

    return NextResponse.json({
      user: { id: payload.id, name: payload.name, email: payload.email },
      session: { token },
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : JSON.stringify(err)
    console.error('POST /api/favorites error:', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
