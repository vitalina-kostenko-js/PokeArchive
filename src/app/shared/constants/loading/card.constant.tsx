import { IPageLoadingModel } from '@/app/entities/models'

const CARD_SKELETON_MODEL: IPageLoadingModel = {
  rows: [
    {
      layout: 'flex',
      className: 'h-[400px] w-full rounded-3xl border-2 p-6 flex-col items-center justify-center',
      items: [
        { variant: 'rect', width: 'w-40', height: 'h-40', className: 'mb-4 rounded-lg' },
        { variant: 'text', width: 'w-32', height: 'h-8', className: 'mb-4' },
        { variant: 'rounded', width: 'w-16', height: 'h-6', className: 'rounded-full' },
      ],
    },
  ],
}

export default CARD_SKELETON_MODEL
