'use client'

import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { loginUser } from '@/app/entities/api/auth'
import { loginSchema, TLoginFormValues } from '@/app/entities/models'
import { PasswordInputComponent } from '@/app/shared/components/password-input'
import { useFormThrottle } from '@/app/shared/hooks/form-throttle'
import { useAuthStore } from '@/app/shared/store'
import { useRouter } from '@/pkg/locale'
import { Button } from '@/pkg/theme/ui/button'
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/pkg/theme/ui/form'
import { Input } from '@/pkg/theme/ui/input'

//component
const LoginFormComponent = () => {
  const t = useTranslations('form_login')
  const tSchema = useTranslations('auth_schema')

  const router = useRouter()

  const form = useForm<TLoginFormValues>({
    resolver: zodResolver(loginSchema({ t: tSchema })),
    defaultValues: { email: '', password: '' },
  })

  const { isLocked, remainingSeconds, registerAttempt } = useFormThrottle({
    maxAttempts: 5,
    lockoutSeconds: 30,
  })

  const { control, formState, handleSubmit, setError } = form
  const { errors, isSubmitting } = formState

  const handleLoginSubmit = async (values: TLoginFormValues) => {
    if (isLocked) {
      //render
      return
    }

    try {
      const res = await loginUser(values)

      if ('error' in res) {
        registerAttempt()

        const message = res.error === 'Too many requests' ? t('tooManyRequests') : t('loginFailed')

        setError('root', { message })
        //render
        return
      }

      useAuthStore.getState().setSession(res.token, {
        id: res.user.id,
        name: res.user.name,
        email: res.user.email,
        image: null,
      })

      router.push('/items')
    } catch {
      registerAttempt()

      setError('root', { message: t('loginFailed') })
    }
  }

  //render
  return (
    <Form {...form}>
      {isLocked && <p className='text-destructive text-sm'>{t('formLocked', { seconds: remainingSeconds })}</p>}

      <form onSubmit={handleSubmit(handleLoginSubmit)} className='space-y-4'>
        {errors.root && <p className='text-destructive text-sm'>{errors.root.message}</p>}

        <FormField
          control={control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('email')}</FormLabel>

              <Input placeholder={t('enterEmail')} {...field} />

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('password')}</FormLabel>

              <PasswordInputComponent placeholder={t('enterPassword')} {...field} />

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' disabled={isLocked || isSubmitting}>
          {t('login')}
        </Button>
      </form>
    </Form>
  )
}

export default LoginFormComponent
