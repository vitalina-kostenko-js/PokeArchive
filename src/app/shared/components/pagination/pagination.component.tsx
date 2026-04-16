'use client'

import { useSearchParams } from 'next/navigation'
import { FC } from 'react'

import { cn } from '@/pkg/lib/utils/utils'
import { usePathname } from '@/pkg/locale'
import { buttonVariants } from '@/pkg/theme/ui/button'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/pkg/theme/ui/pagination'

import visiblePageItems from './pagination.service'

//interface
interface IPaginationProps {
  itemsPerPage: number
  totalItems: number
  onPageChange: (isPending: boolean) => void
}

//component
const PaginationComponent: FC<Readonly<IPaginationProps>> = (props) => {
  const { itemsPerPage, totalItems, onPageChange } = props

  const pathname = usePathname()
  const searchParams = useSearchParams()

  const page = Number(searchParams.get('page') || '1')
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage))

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams.toString())

    params.set('page', pageNumber.toString())

    //render
    return `${pathname}?${params.toString()}`
  }

  const pages = visiblePageItems(page, totalPages)

  //render
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={page > 1 ? createPageURL(page - 1) : '#'}
            className={page <= 1 ? 'pointer-events-none opacity-50' : ''}
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
                href={createPageURL(p)}
                isActive={page === p}
                className={cn(
                  page === p && 'hover:!text-secondary-foreground !border-none !shadow-none',
                  page === p && buttonVariants({ variant: 'secondary', size: 'icon' }),
                )}
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          ),
        )}

        <PaginationItem>
          <PaginationNext
            href={page < totalPages ? createPageURL(page + 1) : '#'}
            className={page >= totalPages ? 'pointer-events-none opacity-50' : ''}
            data-testid='pagination-next'
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default PaginationComponent
