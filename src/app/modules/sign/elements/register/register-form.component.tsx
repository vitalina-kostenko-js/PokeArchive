'use client'

import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { registerUser } from '@/app/entities/api/auth'
import { registerSchema, TRegisterFormValues } from '@/app/entities/models'
import { useFormThrottle } from '@/app/shared/hooks/form-throttle'
import { PasswordInputComponent } from '@/app/shared/ui/password-input'
import { useRouter } from '@/pkg/locale'
import { Button } from '@/pkg/theme/ui/button'
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/pkg/theme/ui/form'
import { Input } from '@/pkg/theme/ui/input'

const RegisterFormComponent = () => {
  const t = useTranslations('form_register')
  const tSchema = useTranslations('auth_schema')

  const router = useRouter()

  const form = useForm<TRegisterFormValues>({
    resolver: zodResolver(registerSchema({ t: tSchema })),
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
  })

  const { isLocked, remainingSeconds, registerAttempt } = useFormThrottle({
    maxAttempts: 5,
    lockoutSeconds: 30,
  })

  const { control, formState, handleSubmit, setError } = form
  const { errors, isSubmitting } = formState

  const handleRegisterSubmit = async (values: TRegisterFormValues) => {
    if (isLocked) {
      //render
      return
    }

    try {
      const res = await registerUser(values)

      if ('error' in res) {
        registerAttempt()

        let message: string

        if (res.error === 'Too many requests') {
          message = t('tooManyRequests')
        } else if (res.error === 'User already exists') {
          message = t('userAlreadyExists')
        } else {
          message = t('registrationFailed')
        }

        setError('root', { message })

        //render
        return
      }

      router.push('/sign-in')

      router.refresh()
    } catch (err) {
      registerAttempt()
      const message = err instanceof Error ? err.message : t('registrationFailed')

      setError('root', { message })
    }
  }

  //render
  return (
    <Form {...form}>
      {isLocked && <p className='text-destructive text-sm'>{t('formLocked', { seconds: remainingSeconds })}</p>}

      <form onSubmit={handleSubmit(handleRegisterSubmit)} className='space-y-4'>
        {errors.root && <p className='text-destructive text-sm'>{errors.root.message}</p>}

        <FormField
          control={control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('name')}</FormLabel>

              <Input placeholder={t('enterName')} {...field} />

              <FormMessage />
            </FormItem>
          )}
        />

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

        <FormField
          control={control}
          name='confirmPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('confirmPassword')}</FormLabel>

              <PasswordInputComponent placeholder={t('enterConfirmPassword')} {...field} />

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' disabled={isSubmitting || isLocked}>
          {isSubmitting ? t('creatingAccount') : t('register')}
        </Button>
      </form>
    </Form>
  )
}

export default RegisterFormComponent
