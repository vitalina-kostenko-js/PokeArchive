import { Metadata } from 'next'

import SignComponent from '@/app/modules/sign/sign.component'

export const metadata: Metadata = {
  title: 'Sign up | PokeArchive',
  description: 'Sign up to create your account to access your library',
}

const RegisterPage = async () => {
  return <SignComponent variant='sign-up' />
}

export default RegisterPage
