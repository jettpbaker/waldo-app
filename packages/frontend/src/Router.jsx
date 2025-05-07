import { createBrowserRouter } from 'react-router'
import Layout from './components/Layout/Layout.jsx'
import Home from './pages/Home.jsx'
import Leaderboard from './pages/Leaderboard.jsx'
import Game from './pages/Game.jsx'
import queryClient from './queryClient.js'
import { getCharacters } from './api/characters.js'

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        loader: async () => {
          queryClient.prefetchQuery({
            queryKey: ['characters'],
            queryFn: getCharacters,
          })

          return null
        },
        element: <Home />,
      },
      {
        path: '/leaderboard',
        element: <Leaderboard />,
      },
      {
        path: '/game',
        element: <Game />,
      },
    ],
  },
])

export default router
