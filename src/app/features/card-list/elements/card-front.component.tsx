import Image from 'next/image'
import { FC } from 'react'

import { IPokemonCardData } from '@/app/entities/models'
import { PokemonTypeComponent } from '@/app/shared/components/pokemon-type'

//interface
interface IProps {
  data: IPokemonCardData
}

//component
const CardFrontComponent: FC<Readonly<IProps>> = (props) => {
  const { data } = props

  //render
  return (
    <div className='bg-card absolute inset-0 flex flex-col items-center justify-center rounded-3xl border-2 p-6 [backface-visibility:hidden]'>
      <div className='relative mb-4 h-40 w-full transition-transform duration-300 group-hover:scale-110'>
        <Image src={data.sprite} alt={data.name} fill className='object-contain' unoptimized />
      </div>

      <h3 className='text-card-foreground mb-4 text-center text-2xl font-black capitalize'>{data.name}</h3>

      <div className='flex flex-wrap justify-center gap-2'>
        {data.types?.map((typeItem) => (
          <PokemonTypeComponent key={typeItem.type.name} typeName={typeItem.type.name} />
        ))}
      </div>
    </div>
  )
}

export default CardFrontComponent
