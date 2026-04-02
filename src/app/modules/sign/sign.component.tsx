import { getTranslations } from 'next-intl/server'

import { Link } from '@/pkg/locale'

import { LoginFormComponent, RegisterFormComponent } from './elements'

interface IProps {
  variant: 'sign-in' | 'sign-up'
}

const SignComponent = async ({ variant }: IProps) => {
  const tLogin = await getTranslations('form_login')
  const tRegister = await getTranslations('form_register')

  return (
    <div className='flex min-h-dvh items-center justify-center px-4'>
      <div className='w-full max-w-md space-y-6 rounded-xl border bg-card p-8 shadow-sm'>
        <div className='space-y-1 text-center'>
          <h1 className='text-2xl font-bold'>
            {variant === 'sign-in' ? tLogin('login') : tRegister('createAccount')}
          </h1>
          <p className='text-sm text-muted-foreground'>
            {variant === 'sign-in' ? tLogin('subtitle') : tRegister('subtitle')}
          </p>
        </div>

        {variant === 'sign-in' ? <LoginFormComponent /> : <RegisterFormComponent />}

        <p className='text-center text-sm text-muted-foreground'>
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
