import { FC } from 'react'

import { IPokemonCardData } from '@/app/entities/models'

import { CardBackComponent, CardFrontComponent, CardMessageComponent } from './elements'

//interface
interface IProps {
  data: IPokemonCardData
}

//component
const CardComponent: FC<Readonly<IProps>> = (props) => {
  const { data } = props

  //render
  return (
    <div className='group relative z-0 h-[400px] w-full [perspective:1000px] focus-within:z-50 hover:z-50'>
      <CardMessageComponent />

      <div className='relative h-full w-full transform-gpu transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] focus-within:[transform:rotateY(180deg)]'>
        <CardFrontComponent data={data} />

        <CardBackComponent data={data} />
      </div>
    </div>
  )
}

export default CardComponent
