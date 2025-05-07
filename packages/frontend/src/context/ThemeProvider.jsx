import React, { useState, useEffect } from 'react'
import { ThemeProvider as SCProvider } from 'styled-components'
import { lightTheme, darkTheme } from '../styles/themes'
import { ThemeContext } from './ThemeContext'

export function ThemeProvider({ children }) {
  const getTheme = () => {
    const stored = localStorage.getItem('theme')
    if (stored === 'light' || stored === 'dark') {
      return stored
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  const [theme, setTheme] = useState(getTheme())

  useEffect(() => {
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggle = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))

  const themeObject = theme === 'light' ? lightTheme : darkTheme

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      <SCProvider theme={themeObject}>{children}</SCProvider>
    </ThemeContext.Provider>
  )
}
