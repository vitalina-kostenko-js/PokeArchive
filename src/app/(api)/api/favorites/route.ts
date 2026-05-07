import { NextRequest, NextResponse } from 'next/server'

import { createFavorite, deleteFavorite, findFavoritesByUser } from '@/app/entities/api/favorites/favorites.service'
import { getAuthenticatedUser } from '@/pkg/auth/api-auth'

// GET /api/favorites
export async function GET(req: NextRequest) {
  const user = await getAuthenticatedUser(req)

  if (!user) {
    //render
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const favorites = await findFavoritesByUser(user.id)

  //render
  return NextResponse.json(favorites)
}

// POST /api/favorites
export async function POST(req: NextRequest) {
  const user = await getAuthenticatedUser(req)

  if (!user) {
    //render
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { pokemonId } = await req.json()

    const favorite = await createFavorite(user.id, pokemonId)

    //render
    return NextResponse.json(favorite)
  } catch (err) {
    console.error('POST /api/favorites error:', err)

    //render
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}

// DELETE /api/favorites
export async function DELETE(req: NextRequest) {
  const user = await getAuthenticatedUser(req)

  if (!user) {
    //render
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { pokemonId } = await req.json()

    if (typeof pokemonId !== 'number') {
      //render
      return NextResponse.json({ error: 'Invalid pokemonId' }, { status: 400 })
    }

    await deleteFavorite(user.id, pokemonId)

    //render
    return NextResponse.json({ success: true })
  } catch (err) {
    //render
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
