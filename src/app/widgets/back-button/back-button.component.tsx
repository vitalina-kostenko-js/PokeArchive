'use client'

import { useRouter } from '@/pkg/locale'
import { ArrowLeft } from 'lucide-react'
import { FC } from 'react'

//interface
interface IProps {
  text: string
}

//component
const BackButtonComponent: FC<Readonly<IProps>> = (props) => {
  const { text } = props

  const router = useRouter()

  return (
    <button
      onClick={() => router.back()}
      className='inline-flex cursor-pointer items-center gap-1 transition-opacity hover:opacity-70'
    >
      <ArrowLeft size={20} /> {text}
    </button>
  )
}

export default BackButtonComponent
