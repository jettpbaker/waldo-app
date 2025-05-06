import React, { createContext, useState, useEffect } from 'react'
import { ThemeProvider as SCProvider } from 'styled-components'
import { lightTheme, darkTheme } from '../styles/themes'

export const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [themeName, setThemeName] = useState('light')

  useEffect(() => {
    const stored = localStorage.getItem('theme')
    if (stored === 'light' || stored === 'dark') {
      setThemeName(stored)
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setThemeName(prefersDark ? 'dark' : 'light')
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('theme', themeName)
  }, [themeName])

  const toggle = () => setThemeName((prev) => (prev === 'light' ? 'dark' : 'light'))

  const themeObject = themeName === 'light' ? lightTheme : darkTheme

  return (
    <ThemeContext.Provider value={{ themeName, toggle }}>
      <SCProvider theme={themeObject}>{children}</SCProvider>
    </ThemeContext.Provider>
  )
}
