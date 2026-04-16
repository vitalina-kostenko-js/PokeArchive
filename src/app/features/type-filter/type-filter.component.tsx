'use client'

import { FC } from 'react'

import { typeIconMap } from '@/app/shared/constants/pokemon-type'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/pkg/theme/ui/select'

//interface
interface IProps {
  selectedType: string | null
  onTypeChange: (type: string | null) => void
}

//component
const TypeFilterComponent: FC<Readonly<IProps>> = (props) => {
  const { selectedType, onTypeChange } = props

  //render
  return (
    <Select
      value={selectedType ?? 'all'}
      onValueChange={(value: string) => onTypeChange(value === 'all' ? null : value)}
    >
      <SelectTrigger className='w-full max-w-48'>
        <SelectValue placeholder='Select Pokemon by type' />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          <SelectLabel>Type</SelectLabel>

          <SelectItem value='all'>All types</SelectItem>

          {Object.keys(typeIconMap).map((type) => (
            <SelectItem key={type} value={type} className='capitalize'>
              {type}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default TypeFilterComponent
