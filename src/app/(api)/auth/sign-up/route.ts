import { NextRequest, NextResponse } from 'next/server'

import { createUser, findUserByEmail } from '../_user.service'

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json()

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    if (await findUserByEmail(email)) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 })
    }

    await createUser(name, email, password)

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 })
  }
}
