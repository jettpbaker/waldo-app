import { createBrowserRouter } from 'react-router'
import Layout from './components/Layout/Layout.jsx'
import Home from './pages/Home.jsx'
import Leaderboard from './pages/Leaderboard.jsx'
import Game from './pages/Game.jsx'

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
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
