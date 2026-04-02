import { type NextPage } from 'next'
import { setRequestLocale } from 'next-intl/server'

import { authServer } from '@/pkg/auth/server/auth.server'

// metadata
export const metadata = {
  title: 'Dashboard',
}

// interface
interface IProps {
  params: Promise<{ locale: string }>
}

// component
const Page: NextPage<Readonly<IProps>> = async (props: IProps) => {
  const { params } = props

  const { locale } = await params
  setRequestLocale(locale)

  const data = await authServer.getSession()
  const email = typeof data.user?.email === 'string' ? data.user.email : ''

  // render
  return <main>Dashboard {email}</main>
}

export default Page
