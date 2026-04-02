'use client'

import { Button } from '@/pkg/theme/ui/button'
import { useTranslations } from 'next-intl'

import { Link } from '@/pkg/locale'

const RegisterButtonComponent = () => {
  const t = useTranslations('auth_button')

  return (
    <Button variant='ghost' size='default' asChild>
      <Link href='/sign-up'>{t('register')}</Link>
    </Button>
  )
}

export default RegisterButtonComponent
