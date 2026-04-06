import { type FC, type ReactNode } from 'react'

import { LayoutComponent } from '@/app/modules/layout'

// interface
interface IProps {
  children: ReactNode
}

// component
const AuthLayoutComponent: FC<Readonly<IProps>> = (props) => {
  const { children } = props

  // render
  return <LayoutComponent type='protected'>{children}</LayoutComponent>
}

export default AuthLayoutComponent
