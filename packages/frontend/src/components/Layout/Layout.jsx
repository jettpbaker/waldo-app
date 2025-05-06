import { Outlet } from 'react-router'
import Navbar from './Navbar'
function Layout() {
  return (
    <div className="layout">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
