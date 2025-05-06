import { Outlet } from 'react-router'
import Navbar from './Navbar'
import styled from 'styled-components'

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

function Layout() {
  return (
    <LayoutContainer>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </LayoutContainer>
  )
}

export default Layout
