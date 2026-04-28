import { Metadata, NextPage } from 'next'

import { SignComponent } from '@/app/modules/sign'

//metadata
export const metadata: Metadata = {
  title: 'Sign in | PokeArchive',
  description: 'Sign in to your account to access your library',
}

//page
const Page = async () => {
  //render
  return <SignComponent variant='sign-in' />
}

export default Page
  