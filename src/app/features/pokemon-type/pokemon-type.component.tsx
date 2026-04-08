import Image from 'next/image'
import { FC } from 'react'

import { typeIcons } from '../../shared/assets/icons'

//interface
interface IProps {
  typeName: string
}

//component
const PokemonTypeComponent: FC<Readonly<IProps>> = (props) => {
  const { typeName } = props
  const iconSrc = typeIcons[typeName]

  return (
    <span className='inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1 text-sm font-bold capitalize dark:bg-gray-700'>
      {iconSrc && <Image src={iconSrc} alt={typeName} width={16} height={16} />}
      {typeName}
    </span>
  )
}

export default PokemonTypeComponent
