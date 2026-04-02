'use client'

import { FC, ReactNode, useState } from 'react'

import type { DehydratedState } from '@tanstack/react-query'
import { HydrationBoundary, QueryClient, QueryClientProvider } from '@tanstack/react-query'

// interface
interface IProviderProps {
  children: ReactNode
}

interface IHydrationProps {
  state: DehydratedState
  children: ReactNode
}

// make query client
const makeQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 60 * 1000,
      },
    },
  })
}

// provider
export const ReactQueryProvider: FC<Readonly<IProviderProps>> = (props) => {
  const [queryClient] = useState(() => makeQueryClient())

  const { children } = props

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

// provider
export const ReactQueryHydration: FC<Readonly<IHydrationProps>> = (props) => {
  const { state, children } = props

  return <HydrationBoundary state={state}>{children}</HydrationBoundary>
}
