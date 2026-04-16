import { IPageLoadingModel } from '@/app/entities/models'

const ITEMS_PAGE_LOADING: IPageLoadingModel = {
  rows: [
    {
      layout: 'flex',
      className: 'gap-2 overflow-x-auto',
      items: Array.from({ length: 8 }).map(() => ({
        variant: 'rounded',
        width: 'w-20',
        height: 'h-9',
        className: 'rounded-full',
      })),
    },
    {
      layout: 'grid',
      className: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4',
      items: Array.from({ length: 12 }).map(() => ({
        variant: 'rounded',
        width: 'w-full',
        height: 'h-[400px]',
        className: 'rounded-3xl',
      })),
    },
    {
      layout: 'flex',
      className: 'justify-center gap-2 py-2',
      items: Array.from({ length: 5 }).map(() => ({
        variant: 'rect',
        width: 'w-10',
        height: 'h-10',
        className: 'rounded-md',
      })),
    },
  ],
}

export default ITEMS_PAGE_LOADING
