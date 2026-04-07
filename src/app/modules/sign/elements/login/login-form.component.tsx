"use client";

import { Button } from "@/pkg/theme/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/pkg/theme/ui/form";
import { Input } from "@/pkg/theme/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useAuthStore } from '@/app/shared/store'
import { useRouter } from '@/pkg/locale'
import { useForm } from 'react-hook-form'
import { LoginFormValues, loginSchema, loginUser } from '../../../../features/auth-form'

//component
const LoginFormComponent = () => {
  const t = useTranslations('form_login')
  const tSchema = useTranslations('auth_schema')

  const router = useRouter()

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema(tSchema)),
    defaultValues: { email: '', password: '' },
  })

  const { control, formState, handleSubmit, setError } = form
  const { errors, isSubmitting } = formState

  const handleLoginSubmit = async (values: LoginFormValues) => {
    try {
      const res = await loginUser(values)

      if ('error' in res) {
        setError('root', { message: t('loginFailed') })
        return
      }

      useAuthStore.getState().setSession(res.token, {
        id: res.user.id,
        name: res.user.name,
        email: res.user.email,
        image: null,
      })

      router.push('/items')
      router.refresh()
    } catch {
      setError('root', { message: t('loginFailed') })
    }
  }

  return (
    <Form {...form}>
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

              <Input type='password' placeholder={t('enterPassword')} {...field} />

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' disabled={isSubmitting}>
          {isSubmitting ? t('loggingIn') : t('login')}
        </Button>
      </form>
    </Form>
  )
}

export default LoginFormComponent;
