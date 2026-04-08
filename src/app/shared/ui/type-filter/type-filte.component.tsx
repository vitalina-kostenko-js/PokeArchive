'use client'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/pkg/theme/ui/select'
import { FC } from 'react'
import { POKEMON_TYPES } from '../../constants'

//interface
interface IProps {
  selectedType: string | null
  onTypeChange: (type: string | null) => void
}

//component
const TypeFilterComponent: FC<Readonly<IProps>> = (props) => {
  const { selectedType, onTypeChange } = props

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
          {POKEMON_TYPES.map((type) => (
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
