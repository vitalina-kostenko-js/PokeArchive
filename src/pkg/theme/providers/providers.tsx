'use client'

import { FC, ReactNode, useState } from 'react'

import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { getQueryClient } from '@/pkg/rest-api/service'

// interface
interface IProviderProps {
  children: ReactNode
}

// provider
const ReactQueryProvider: FC<Readonly<IProviderProps>> = (props) => {
  const [queryClient] = useState(() => getQueryClient())

  const { children } = props

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />

      {children}
    </QueryClientProvider>
  )
}

export default ReactQueryProvider
