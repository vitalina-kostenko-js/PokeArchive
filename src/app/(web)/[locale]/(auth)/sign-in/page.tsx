import { Metadata } from 'next'

import { SignComponent } from '@/app/modules/sign'

//metadata
export const metadata: Metadata = {
  title: 'Sign in | PokeArchive',
  description: 'Sign in to your account to access your library',
}

//page
const LoginPage = async () => {
  //render
  return <SignComponent variant='sign-in' />
}

export default LoginPage
