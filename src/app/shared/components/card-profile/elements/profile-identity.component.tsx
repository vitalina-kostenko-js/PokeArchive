import { FC } from 'react'

//interface
interface IProps {
  id: number
  name: string
  genus?: string
}

//component
const ProfileIdentityComponent: FC<Readonly<IProps>> = (props) => {
  const { id, name, genus } = props

  //render
  return (
    <div>
      <span className='text-sm font-bold tracking-widest text-blue-500 uppercase'>
        #{id.toString().padStart(3, '0')}
      </span>

      <h1 className='text-4xl font-black text-gray-900 capitalize md:text-5xl dark:text-white'>{name}</h1>

      <p className='text-gray-500 italic dark:text-gray-400'>{genus}</p>
    </div>
  )
}

export default ProfileIdentityComponent
