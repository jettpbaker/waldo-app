import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from './context/ThemeProvider.jsx'
import { GlobalStyle } from './styles/GlobalStyle.jsx'
import { RouterProvider } from 'react-router'
import { QueryClientProvider } from '@tanstack/react-query'
import router from './Router.jsx'
import queryClient from './queryClient.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <GlobalStyle />
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
)
