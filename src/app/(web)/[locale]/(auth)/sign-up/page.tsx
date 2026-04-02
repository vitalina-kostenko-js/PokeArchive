import SignComponent from '@/app/modules/sign/sign.component'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign up | MyLibrary',
  description: 'Sign up to create your account to access your library',
}

const RegisterPage = async () => {
  return <SignComponent variant='sign-up' />
}

export default RegisterPage
