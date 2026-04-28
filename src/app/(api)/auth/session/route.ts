import { jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

// jwt secret
const JWT_SECRET = process.env.JWT_SECRET

if (!JWT_SECRET && process.env.NODE_ENV === 'production') {
  throw new Error('JWT_SECRET must be set in production')
}

// encoded secret
const secret = new TextEncoder().encode(JWT_SECRET ?? 'local-dev-secret')

//GET /auth/session
export async function GET() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('auth-token')?.value

    if (!token) {
      //render
      return NextResponse.json({ user: null, session: null })
    }

    const { payload } = await jwtVerify(token, secret)

    //render
    return NextResponse.json({
      user: { id: payload.id, name: payload.name, email: payload.email },
      session: { token },
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : JSON.stringify(err)
    console.error('GET /auth/session error:', message)

    //render
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
