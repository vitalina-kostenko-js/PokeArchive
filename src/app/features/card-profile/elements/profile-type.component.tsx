import { FC } from 'react'

import { IType } from '@/app/entities/models'
import { PokemonTypeComponent } from '@/app/shared/components/pokemon-type'

//interface
interface IProps {
  types?: IType[]
}

//component
const ProfileTypeComponent: FC<Readonly<IProps>> = (props) => {
  const { types } = props

  //render
  return (
    <div className='flex flex-wrap justify-center gap-2 md:justify-start'>
      {types?.map((typeItem) => (
        <PokemonTypeComponent key={typeItem.type.name} typeName={typeItem.type.name} />
      ))}
    </div>
  )
}

export default ProfileTypeComponent
