import { NextRequest, NextResponse } from 'next/server'
import z from 'zod'

import { createUser, findUserByEmail } from '@/app/(api)/auth/user.service'
import { authRateLimit } from '@/pkg/rate-limit'

const signUpSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  password: z.string().min(10),
})

//route
export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown'

  const { success } = await authRateLimit.limit(ip)

  if (!success) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }

  try {
    const parsed = signUpSchema.safeParse(await req.json())

    if (!parsed.success) {
      return NextResponse.json({ error: 'Validation failed', details: parsed.error.flatten() }, { status: 400 })
    }

    const { name, email, password } = parsed.data

    if (!name || !email || !password) {
      //render
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    if (await findUserByEmail(email)) {
      //render
      return NextResponse.json({ error: 'User already exists' }, { status: 400 })
    }

    await createUser(name, email, password)

    return NextResponse.json({ success: true })
  } catch {
    //render
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 })
  }
}
