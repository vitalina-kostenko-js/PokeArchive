import { getLocale } from 'next-intl/server'
import { type FC, type ReactNode } from 'react'
import { authServer } from '../../../../pkg/auth/server/auth.server'
import { redirect } from '../../../../pkg/locale'

// interface
interface IProps {
  children: ReactNode
}

// component
const ProtectedLayoutComponent: FC<Readonly<IProps>> = async (props) => {
  const { children } = props

  const session = await authServer.getSession()

  if (!session.user) {
    const locale = await getLocale()

    redirect({ href: '/sign-in', locale })
  }
  
  return <>{children}</>
}

export default ProtectedLayoutComponent
