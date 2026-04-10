import { SignJWT } from 'jose'
import { NextRequest, NextResponse } from 'next/server'

import { findUserByEmail, verifyPassword } from '../_user.service'

const secret = new TextEncoder().encode(process.env.JWT_SECRET ?? 'local-dev-secret')

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()

    const user = await findUserByEmail(email)

    if (!user || !(await verifyPassword(password, user.password_hash))) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
    }

    const token = await new SignJWT({ id: user.id, name: user.name, email: user.email })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('7d')
      .sign(secret)

    const sessionUser = { id: user.id, name: user.name, email: user.email }

    const response = NextResponse.json({ token, user: sessionUser })
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
      sameSite: 'lax',
    })

    return response
  } catch {
    return NextResponse.json({ error: 'Login failed' }, { status: 500 })
  }
}
