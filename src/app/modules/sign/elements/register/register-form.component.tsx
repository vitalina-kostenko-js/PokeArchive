'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useRouter } from '@/pkg/locale'
import { useForm } from 'react-hook-form'
import { Button } from '../../../../../pkg/theme/ui/button'
import { Form, FormField, FormItem, FormLabel, FormMessage } from '../../../../../pkg/theme/ui/form'
import { Input } from '../../../../../pkg/theme/ui/input'
import { RegisterFormValues, registerSchema, registerUser } from '../../../../features/auth-form'

const RegisterFormComponent = () => {
  const t = useTranslations('form_register')
  const tSchema = useTranslations('auth_schema')

  const router = useRouter()

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema(tSchema)),
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
  })

  const handleRegisterSubmit = async (values: RegisterFormValues) => {
    try {
      await registerUser(values)
      router.push('/sign-in')
      router.refresh()
    } catch (err) {
      const message = err instanceof Error ? err.message : t('registrationFailed')
      form.setError('root', { message })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleRegisterSubmit)} className='space-y-4'>
        {form.formState.errors.root && <p className='text-destructive text-sm'>{form.formState.errors.root.message}</p>}

        <FormField
          control={form.control}
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
          control={form.control}
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
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('password')}</FormLabel>

              <Input type='password' placeholder={t('enterPassword')} {...field} />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='confirmPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('confirmPassword')}</FormLabel>

              <Input type='password' placeholder={t('enterConfirmPassword')} {...field} />
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? t('creatingAccount') : t('register')}
        </Button>
      </form>
    </Form>
  )
}

export default RegisterFormComponent
