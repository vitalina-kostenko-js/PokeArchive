import { FC } from 'react'

import { IType } from '../../../entities/models'
import { PokemonTypeComponent } from '../../../features/pokemon-type'

interface IProps {
  types?: IType[]
}

const ProfileTypeComponent: FC<Readonly<IProps>> = (props) => {
  const { types } = props

  return (
    <div className='flex flex-wrap justify-center gap-2 md:justify-start'>
      {types?.map((typeItem) => (
        <PokemonTypeComponent key={typeItem.type.name} typeName={typeItem.type.name} />
      ))}
    </div>
  )
}

export default ProfileTypeComponent
