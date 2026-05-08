'use client'

import { HeartIcon } from 'lucide-react'
import { FC } from 'react'

import { Button } from '@/pkg/theme/ui/button'

//interface
interface IProps {
  isFavorite: boolean
  isPending: boolean
  onToggle: () => void
}

//component
const FavoriteButtonComponent: FC<IProps> = (props) => {
  const {isFavorite, isPending, onToggle} = props

  //render
  return (
    <Button variant='ghost' size='icon' onClick={onToggle} disabled={isPending}>
      <HeartIcon
        className={`size-5 transition-colors ${isFavorite ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`}
      />
    </Button>
  )
}

export default FavoriteButtonComponent
