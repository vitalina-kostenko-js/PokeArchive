export const getFavorites = async () => {
  const res = await fetch('/api/favorites', {
    credentials: 'include',
  })

  if (!res.ok) {
    const errorBody = await res.text()
    throw new Error(`Failed (${res.status}): ${errorBody}`)
  }

  return res.json()
}

export const addFavorite = async (pokemonId: number) => {
  const res = await fetch('/api/favorites', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ pokemonId: pokemonId }),
    credentials: 'include',
  })

  if (!res.ok) {
    const errorBody = await res.text()
    throw new Error(`Failed (${res.status}): ${errorBody}`)
  }

  return res.json()
}
