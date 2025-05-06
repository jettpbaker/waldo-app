import styled from 'styled-components'
import { Trophy, House, Moon, SunMedium } from 'lucide-react'
import { NavLink } from 'react-router'
import ThemeSwitcher from './ThemeSwitcher.jsx'

const NavbarContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
`

const NavBarGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const NavBarLink = styled(NavLink)`
  background: none;
  border: none;
  cursor: pointer;
`

const NavBarButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;

  color: ${({ theme }) => theme.colors.primary};
`

export default function Navbar() {
  return (
    <NavbarContainer>
      <NavBarLink to="/">
        <House />
      </NavBarLink>
      <NavBarGroup>
        <ThemeSwitcher />
        <NavBarLink to="/">
          <Trophy />
        </NavBarLink>
      </NavBarGroup>
    </NavbarContainer>
  )
}
