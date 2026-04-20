import { Metadata } from 'next'

import { SignComponent } from '@/app/modules/sign'

//metadata
export const metadata: Metadata = {
  title: 'Sign up | PokeArchive',
  description: 'Sign up to create your account to access your library',
}

//page
const RegisterPage = async () => {
  //render
  return <SignComponent variant='sign-up' />
}

export default RegisterPage
