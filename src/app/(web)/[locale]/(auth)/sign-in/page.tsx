import { Metadata, NextPage } from 'next'

import { SignComponent } from '@/app/modules/sign'
import { setRequestLocale } from 'next-intl/server'

//metadata
export const metadata: Metadata = {
  title: 'Sign in | PokeArchive',
  description: 'Sign in to your account to access your library',
}

// interface
interface IProps {
  params: Promise<{ locale: string }>
}

// page
const Page: NextPage<Readonly<IProps>> = async (props: IProps) => {
  const { params } = props

  const { locale } = await params
  setRequestLocale(locale)
  
  //render
  return <SignComponent variant='sign-in' />
}

export default Page
  