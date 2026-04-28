import { getTranslations } from 'next-intl/server'
import { FC } from 'react'

import { Link } from '@/pkg/locale'

import { RegisterFormComponent } from '@/app/modules/sign/elements/register'
import { LoginFormComponent } from './elements/login'

//interface
interface IProps {
  variant: 'sign-in' | 'sign-up'
}

//component
const SignComponent: FC<Readonly<IProps>> = async (props) => {
  const { variant } = props

  const tLogin = await getTranslations('form_login')
  const tRegister = await getTranslations('form_register')

  //render
  return (
    <div className='flex min-h-dvh items-center justify-center px-4'>
      <div className='bg-card w-full max-w-md space-y-6 rounded-xl border p-8 shadow-sm'>
        <div className='space-y-1 text-center'>
          <h1 className='text-2xl font-bold'>{variant === 'sign-in' ? tLogin('login') : tRegister('createAccount')}</h1>

          <p className='text-muted-foreground text-sm'>
            {variant === 'sign-in' ? tLogin('subtitle') : tRegister('subtitle')}
          </p>
        </div>

        {variant === 'sign-in' ? <LoginFormComponent /> : <RegisterFormComponent />}

        <p className='text-muted-foreground text-center text-sm'>
          {variant === 'sign-in' ? (
            <>
              {tLogin('dontHaveAccount')}{' '}
              <Link href='/sign-up' className='text-primary underline-offset-4 hover:underline'>
                {tRegister('register')}
              </Link>
            </>
          ) : (
            <>
              {tRegister('alreadyHaveAccount')}{' '}
              <Link href='/sign-in' className='text-primary underline-offset-4 hover:underline'>
                {tLogin('login')}
              </Link>
            </>
          )}
        </p>
      </div>
    </div>
  )
}

export default SignComponent
