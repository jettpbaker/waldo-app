import styled from 'styled-components'

const NavbarContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
`

export default function Navbar() {
  return (
    <NavbarContainer>
      <h1>Home</h1>
      <h1>Change Theme</h1>
      <h1>Leaderboard</h1>
    </NavbarContainer>
  )
}
