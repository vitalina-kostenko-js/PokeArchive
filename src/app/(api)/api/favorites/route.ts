import { NextRequest, NextResponse } from 'next/server'

import { addFavorite, getUserFavorites, removeFavorite } from '@/app/(api)/api/favorites/favorites.service'
import { getAuthenticatedUser } from '@/pkg/auth/api-auth'

export async function GET(req: NextRequest) {
  const user = await getAuthenticatedUser(req)

  if (!user) {
    //render
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const favorites = await getUserFavorites(user.id)

  //render
  return NextResponse.json(favorites)
}

export async function POST(req: NextRequest) {
  const user = await getAuthenticatedUser(req)

  if (!user) {
    //render
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { pokemonId } = await req.json()

    const favorite = await addFavorite(user.id, pokemonId)

    //render
    return NextResponse.json(favorite)
  } catch (err) {
    console.error('POST /api/favorites error:', err)

    //render
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}

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

    await removeFavorite(user.id, pokemonId)

    //render
    return NextResponse.json({ success: true })
  } catch (err) {
    //render
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
