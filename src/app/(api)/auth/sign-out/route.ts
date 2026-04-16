import { NextResponse } from 'next/server'

//route
export async function POST() {
  const response = NextResponse.json({ success: true })
  response.cookies.set('auth-token', '', { maxAge: 0, path: '/' })

  //render
  return response
}
