import { Metadata } from 'next'

import SignComponent from '@/app/modules/sign/sign.component'

export const metadata: Metadata = {
  title: 'Sign in | PokeArchive',
  description: 'Sign in to your account to access your library',
}

const LoginPage = async () => {
  return <SignComponent variant='sign-in' />
}

export default LoginPage
