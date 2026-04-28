import { ReactNode } from 'react'

//interface
interface ILayoutComponentProps {
  children: ReactNode
  type: 'public' | 'protected'
}

//component
const LayoutComponent = (props: ILayoutComponentProps) => {
  const { children } = props

  //render
  return <div className='relative z-0 flex min-h-dvh flex-col'>{children}</div>
}

export default LayoutComponent
