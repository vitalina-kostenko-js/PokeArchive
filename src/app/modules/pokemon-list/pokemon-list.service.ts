import { useSearchParams } from 'next/navigation'
import { useCallback, useTransition } from 'react'

import { useRouter } from '@/pkg/locale'

export const useTypeFilter = () => {
  const router = useRouter()

  const searchParams = useSearchParams()

  const [isPending, startTransition] = useTransition()

  const handleTypeChange = useCallback(
    (type: string | null) => {
      const params = new URLSearchParams(searchParams.toString())

      params.delete('page')
      if (type) {
        params.set('type', type)
      } else {
        params.delete('type')
      }

      startTransition(() => {
        router.push(`?${params.toString()}`)
      })
    },
    [router, searchParams, startTransition],
  )
  //render
  return { handleTypeChange, isPending }
}
