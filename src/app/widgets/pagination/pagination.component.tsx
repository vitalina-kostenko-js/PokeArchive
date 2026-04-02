'use client'

import { useSearchParams } from 'next/navigation'
import { cn } from '../../../pkg/lib/utils/utils'
import { usePathname, useRouter } from '../../../pkg/locale'
import { buttonVariants } from '../../../pkg/theme/ui/button'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../../../pkg/theme/ui/pagination'
import visiblePageItems from './pagination.service'

interface IPaginationProps {
  itemsPerPage: number
  totalItems: number
  onPageChange?: (page: number) => void
}

const PaginationComponent = (props: IPaginationProps) => {
  const { itemsPerPage, totalItems, onPageChange } = props

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const page = Number(searchParams.get('page') || '1') || 1
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage))

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString())

    params.set('page', String(newPage))

    router.replace(`${pathname}?${params.toString()}`)

    onPageChange?.(newPage)
  }

  const pages = visiblePageItems(Math.min(Math.max(1, page), totalPages), totalPages)

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            size='default'
            onClick={() => {
              if (page > 1) handlePageChange(page - 1)
            }}
          />
        </PaginationItem>

        {pages.map((p, i) =>
          p === 'ellipsis' ? (
            <PaginationItem key={`e-${i}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={p}>
              <PaginationLink
                size='default'
                onClick={() => handlePageChange(p)}
                isActive={page === p}
                className={
                  page === p
                    ? cn(
                        'hover:!text-secondary-foreground !border-none !shadow-none',
                        buttonVariants({ variant: 'secondary', size: 'icon' }),
                      )
                    : ''
                }
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          ),
        )}

        <PaginationItem>
          <PaginationNext
            data-testid='pagination-next'
            size='default'
            onClick={() => {
              if (page < totalPages) handlePageChange(page + 1)
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default PaginationComponent
