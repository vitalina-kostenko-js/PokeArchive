'use client'

import { Link } from '@/pkg/locale'
import { Button } from '@/pkg/theme/ui/button'
import { useTranslations } from 'next-intl'

const LoginButtonComponent = () => {
  const t = useTranslations('auth_button')

  return (
    <Button variant='ghost' size='default' asChild>
      <Link href='/sign-in'>{t('login')}</Link>
    </Button>
  )
}

export default LoginButtonComponent
