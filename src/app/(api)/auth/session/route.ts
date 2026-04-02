import { jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

const secret = new TextEncoder().encode(process.env.JWT_SECRET ?? 'local-dev-secret')

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
  } catch {
    return NextResponse.json({ user: null, session: null })
  }
}
