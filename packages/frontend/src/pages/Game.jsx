import React from 'react'
import { useQuery } from '@tanstack/react-query'

import getCharacters from '../api/characters.js'
function Game() {
  const {
    isPending,
    isError,
    data: characters,
    error,
  } = useQuery({
    queryKey: ['characters'],
    queryFn: getCharacters,
  })

  if (isPending) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div>
      <h1>Game Page</h1>
      <p>Placeholder content for the game.</p>
      <ul>
        {characters.map((character) => (
          <li key={character.id}>{character.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default Game
