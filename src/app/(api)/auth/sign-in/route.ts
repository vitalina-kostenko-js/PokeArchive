import { SignJWT } from 'jose'
import { NextRequest, NextResponse } from 'next/server'
import z from 'zod'

import { findUserByEmail, verifyPassword } from '@/app/entities/api/auth/auth.service'
import { authRateLimit } from '@/pkg/rate-limit'

// jwt secret
const secret = new TextEncoder().encode(process.env.JWT_SECRET)

//schema
const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

	// POST /auth/sign-in
export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown'

  const { success } = await authRateLimit.limit(ip)

  if (!success) {
    //render
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }

  const parsed = signInSchema.safeParse(await req.json())

  if (!parsed.success) {
    //render
    return NextResponse.json({ error: 'Validation failed' }, { status: 400 })
  }

  try {
    const { email, password } = parsed.data

    const user = await findUserByEmail(email)

    if (!user || !(await verifyPassword(password, user.password_hash))) {
      //render
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
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
      sameSite: 'lax',
    })

    //render
    return response
  } catch {
    //render
    return NextResponse.json({ error: 'Login failed' }, { status: 500 })
  }
}
