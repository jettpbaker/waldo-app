import { QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 10 minutes
      staleTime: 1000 * 60 * 10,
      retry: 1,
    },
  },
})

export default queryClient
