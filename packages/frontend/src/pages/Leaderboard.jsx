import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getGames } from '../api/games.js'

function Leaderboard() {
  const {
    isPending,
    isError,
    data: games,
    error,
  } = useQuery({
    queryKey: ['games'],
    queryFn: getGames,
  })

  if (isPending) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div>
      <h1>Leaderboard Page</h1>
      {games.length === 0 && <p>No games found</p>}
      {games.length > 0 && (
        <ul>
          {games.map((game) => (
            <li key={game.id}>{game.name}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Leaderboard
