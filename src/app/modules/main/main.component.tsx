import { getTranslations } from 'next-intl/server'

import { authServer } from '@/pkg/auth/server'
import { Link } from '@/pkg/locale'
import { Button } from '@/pkg/theme/ui/button'

//interface
interface IUserSession {
  user?: {
    name?: string
  }
}

//component
const MainComponent = async () => {
  const t = await getTranslations('home')

  const session = (await authServer.getSession()) as IUserSession | null
  const user = session?.user

  //render
  return (
    <div className='flex flex-1 flex-col items-center justify-center p-4'>
        <div className='max-w-xl space-y-6 text-center'>
          {user ? (
            <div>
              <h1 className='text-4xl font-bold tracking-tight'>
                {t('welcome')} {user.name}
              </h1>

              <p className='text-muted-foreground text-lg'>{t('welcomeDescription')}</p>

              <Button asChild size='lg' className='px-8'>
                <Link href='/items'>{t('viewLibrary')}</Link>
              </Button>
            </div>
          ) : (
            <div>
              <h1 className='text-4xl font-bold tracking-tight'>{t('title')}</h1>

              <p className='text-muted-foreground text-lg'>{t('description')}</p>

              <div className='flex items-center justify-center gap-4'>
                <Button asChild size='lg'>
                  <Link href='/sign-in'>{t('signIn')}</Link>
                </Button>

                <Button asChild size='lg' variant='outline'>
                  <Link href='/sign-up'>{t('signUp')}</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
    </div>
  )
}

export default MainComponent
