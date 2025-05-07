import { createBrowserRouter } from 'react-router'
import Layout from './components/Layout/Layout.jsx'
import Home from './pages/Home.jsx'
import Leaderboard from './pages/Leaderboard.jsx'
import Game from './pages/Game.jsx'
import api from './api/api.js'

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        loader: async () => {
          api.prefetchCharacters()
          api.prefetchGames()
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
