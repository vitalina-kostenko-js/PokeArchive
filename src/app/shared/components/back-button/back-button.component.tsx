'use client'

import { ArrowLeft } from 'lucide-react'
import { FC } from 'react'

import { useRouter } from '@/pkg/locale'
import { Button } from '@/pkg/theme/ui/button'

//interface
interface IProps {
  text: string
}

//component
const BackButtonComponent: FC<Readonly<IProps>> = (props) => {
  const { text } = props

  const router = useRouter()

  //render
  return (
    <Button
      onClick={() => router.back()}
      variant='ghost'
    >
      <ArrowLeft size={20} /> {text}
    </Button>
  )
}

export default BackButtonComponent
