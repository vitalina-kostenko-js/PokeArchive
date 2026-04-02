import SignComponent from '@/app/modules/sign/sign.component'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign in | MyLibrary',
  description: 'Sign in to your account to access your library',
}

const LoginPage = async () => {
  return <SignComponent variant='sign-in' />
}

export default LoginPage
