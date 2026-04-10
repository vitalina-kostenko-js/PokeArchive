import { NextRequest, NextResponse } from 'next/server'

import { addFavorite, getUserFavorites, removeFavorite } from './_favorites.servise'

export async function GET(req: NextRequest) {
  const userId = req.headers.get('x-user-id')

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const favorites = await getUserFavorites(userId)

  return NextResponse.json(favorites)
}

export async function POST(req: NextRequest) {
  const userId = req.headers.get('x-user-id')

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const { pokemonId } = await req.json()

    const favorite = await addFavorite(userId, pokemonId)

    return NextResponse.json(favorite)
  } catch (err) {
    console.error('POST /api/favorites error:', err)

    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  const userId = req.headers.get('x-user-id')

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { pokemonId } = await req.json()

  await removeFavorite(userId, pokemonId)

  return NextResponse.json({ success: true })
}
