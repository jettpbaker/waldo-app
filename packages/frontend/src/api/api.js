import { getGames } from './games.js'
import getCharacters from './characters.js'
import queryClient from '../queryClient.js'

const api = {
  prefetchCharacters: () => {
    queryClient.prefetchQuery({
      queryKey: ['characters'],
      queryFn: getCharacters,
    })
  },
  prefetchGames: () => {
    queryClient.prefetchQuery({
      queryKey: ['games'],
      queryFn: getGames,
    })
  },
}

export default api
