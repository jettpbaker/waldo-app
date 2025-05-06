import { createBrowserRouter } from 'react-router'
import Layout from './components/Layout/Layout.jsx'
import Home from './pages/Home.jsx'

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
    ],
  },
])

export default router
