import Image from 'next/image'
import { FC } from 'react'

//interface
interface IProps {
  mainImage: string
  pokemon: string
}

//component
const ProfileAvatarComponent: FC<Readonly<IProps>> = (props) => {
  const { mainImage, pokemon } = props

  //render
  return (
    <div className='group relative'>
      <div className='absolute inset-0 rounded-full bg-blue-500/10 blur-3xl transition-all group-hover:bg-blue-500/20' />
      <Image
        src={mainImage}
        alt={pokemon}
        width={256}
        height={256}
        className='relative object-contain drop-shadow-2xl transition-transform duration-300 group-hover:scale-105'
      />
    </div>
  )
}

export default ProfileAvatarComponent
