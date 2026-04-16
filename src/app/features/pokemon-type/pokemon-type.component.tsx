import { FC } from 'react'

import { typeColorMap, typeIconMap } from '@/app/shared/constants/pokemon-type'

//interface
interface IProps {
  typeName: string
}

//component
const PokemonTypeComponent: FC<Readonly<IProps>> = (props) => {
  const { typeName } = props

  const lookupKey = typeName.toLowerCase()

  const Icon = typeIconMap[lookupKey]
  const colors = typeColorMap[lookupKey] ?? {
    bg: 'bg-gray-100 dark:bg-gray-700',
    text: 'text-gray-700 dark:text-gray-300',
  }

  //render
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-bold capitalize ${colors.bg} ${colors.text}`}
    >
      {Icon && <Icon width={16} height={16} fill='currentColor' className='h-4 w-4' />}
      {typeName}
    </span>
  )
}

export default PokemonTypeComponent
