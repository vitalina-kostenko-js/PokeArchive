//type
export type TSkeletonVariant = 'circle' | 'rect' | 'text' | 'rounded'

//interface
export interface ISkeletonItem {
  variant: TSkeletonVariant
  width: string
  height: string
  className?: string
}

export interface ISkeletonRow {
  layout: 'flex' | 'grid'
  className?: string
  items: ISkeletonItem[]
}

export interface IPageLoadingModel {
  rows: ISkeletonRow[]
  repeat?: number
}
