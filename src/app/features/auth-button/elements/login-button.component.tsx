'use client'

import { useTranslations } from 'next-intl'

import { Link } from '@/pkg/locale'
import { Button } from '@/pkg/theme/ui/button'

const LoginButtonComponent = () => {
  const t = useTranslations('auth_button')

  //render
  return (
    <Button variant='ghost' size='default' asChild>
      <Link href='/sign-in'>{t('login')}</Link>
    </Button>
  )
}

export default LoginButtonComponent
