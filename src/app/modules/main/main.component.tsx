import { getTranslations } from 'next-intl/server'
import { authServer } from '../../../pkg/auth/server'
import { Link } from '../../../pkg/locale'
import { DashboardLayoutComponent } from '../../widgets/dashboard'

interface UserSession {
  user?: {
    name?: string
  }
}

const MainComponent = async () => {
  const t = await getTranslations('home')
  
  const session = (await authServer.getSession()) as UserSession | null
  const user = session?.user

  return (
    <DashboardLayoutComponent>
      <div className='flex flex-1 flex-col items-center justify-center p-4'>
        <div className='max-w-xl space-y-6 text-center'>
          {user ? (
            <>
              <h1 className='text-4xl font-bold tracking-tight'>
                {t('welcome')} {user.name}
              </h1>
              <p className='text-lg text-gray-600'>{t('welcomeDescription')}</p>
              <Link
                href='/items'
                className='inline-block rounded-lg bg-white px-8 py-3 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-gray-200 transition-all hover:bg-gray-50 hover:shadow-md active:scale-95'
              >
                {t('viewLibrary')}
              </Link>
            </>
          ) : (
            <>
              <h1 className='text-4xl font-bold tracking-tight'>{t('title')}</h1>
              <p className='text-lg text-gray-600'>{t('description')}</p>
              <div className='flex items-center justify-center gap-4'>
                <Link
                  href='/sign-in'
                  className='min-w-[120px] rounded-lg bg-white px-6 py-3 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-gray-200 transition-all hover:bg-gray-50 hover:shadow-md active:scale-95'
                >
                  {t('signIn')}
                </Link>
                <Link
                  href='/sign-up'
                  className='min-w-[120px] rounded-lg bg-gray-50 px-6 py-3 text-sm font-medium text-gray-700 transition-all hover:bg-gray-100 active:scale-95'
                >
                  {t('signUp')}
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </DashboardLayoutComponent>
  )
}

export default MainComponent
