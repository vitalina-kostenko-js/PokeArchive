import { NextRequest, NextResponse } from 'next/server'
import { localUsers } from '../_store'

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json()

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    if (localUsers.has(email)) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 })
    }

    const user = { id: crypto.randomUUID(), name, email, password }
    localUsers.set(email, user)

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 })
  }
}
