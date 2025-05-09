import styled from 'styled-components'
import { Moon, SunMedium } from 'lucide-react'
import useTheme from '../../hooks/useTheme.js'
import { useRef } from 'react'

const ThemeSwitchButton = styled.button`
  background: none;
  border: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin: 0;
  line-height: 0;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.fg};
`

export default function ThemeSwitcher() {
  const { theme, toggle } = useTheme()
  const buttonRef = useRef(null)

  const handleClick = async () => {
    const { x, y, width, height } = buttonRef.current.getBoundingClientRect()

    const cx = Math.round(x + width / 2) + 'px'
    const cy = Math.round(y + height / 2) + 'px'

    document.documentElement.style.setProperty('--cx', cx)
    document.documentElement.style.setProperty('--cy', cy)

    // calculate radius to the farthest viewport corner and set CSS var
    const cxNum = parseFloat(cx)
    const cyNum = parseFloat(cy)
    const { innerWidth: vw, innerHeight: vh } = window
    const distances = [
      // distance to the top left corner
      Math.hypot(cxNum, cyNum),
      // distance to the top right corner
      Math.hypot(vw - cxNum, cyNum),
      // distance to the bottom left corner
      Math.hypot(cxNum, vh - cyNum),
      // distance to the bottom right corner
      Math.hypot(vw - cxNum, vh - cyNum),
    ]
    const r = Math.ceil(Math.max(...distances)) + 'px'
    document.documentElement.style.setProperty('--r', r)

    if (typeof document.startViewTransition !== 'function') {
      toggle()
      return
    }

    /*
    This is a practice project so I probably won't come back and do this, but:
    Once React's <ViewTransition> API
    (https://react.dev/reference/react/ViewTransition)
    is production ready, you could use it to animate the theme change.
    */

    document.startViewTransition(async () => toggle())
  }

  return (
    <ThemeSwitchButton ref={buttonRef} onClick={handleClick}>
      {theme === 'dark' ? <SunMedium /> : <Moon />}
    </ThemeSwitchButton>
  )
}
