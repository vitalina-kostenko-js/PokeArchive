'use client'

import { FC } from 'react'

import { IPageLoadingModel } from '@/app/entities/models'
import { cn } from '@/pkg/theme/lib/utils'
import { Skeleton } from '@/pkg/theme/ui/skeleton'

//interface
interface ISkeletonRenderProps {
  model: IPageLoadingModel
}

//style
const variantStyles: Record<string, string> = {
  circle: 'rounded-full',
  rect: '',
  text: 'rounded-sm',
  rounded: 'rounded-xl',
}

//component
const SkeletonRendererComponent: FC<Readonly<ISkeletonRenderProps>> = (props) => {
  const { model } = props

  const content = model.rows.map((row, rowIdx) => (
    <div key={rowIdx} className={cn(row.layout === 'grid' ? 'grid' : 'flex', row.className)}>
      {row.items.map((item, itemIdx) => (
        <Skeleton key={itemIdx} className={cn(item.width, item.height, variantStyles[item.variant], item.className)} />
      ))}
    </div>
  ))

  if (model.repeat && model.repeat > 1) {
    //render
    return (
      <>
        {Array.from({ length: model.repeat }).map((_, i) => (
          <div key={i}>{content}</div>
        ))}
      </>
    )
  }

  //render
  return <>{content}</>
}

export default SkeletonRendererComponent
