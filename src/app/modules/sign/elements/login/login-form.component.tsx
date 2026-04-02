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
  const t = useTranslations("form_login");
  const tSchema = useTranslations("auth_schema");

  const router = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema(tSchema)),
    defaultValues: { email: "", password: "" },
  });

  const handleLoginSubmit = async (values: LoginFormValues) => {
    try {
      const res = await loginUser(values);

      if ('error' in res) {
        form.setError('root', { message: t('loginFailed') })
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
      form.setError("root", { message: t("loginFailed") });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleLoginSubmit)}
        className="space-y-4"
      >
        {form.formState.errors.root && (
          <p className="text-destructive text-sm">
            {form.formState.errors.root.message}
          </p>
        )}

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("email")}</FormLabel>

              <Input placeholder={t("enterEmail")} {...field} />

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("password")}</FormLabel>

              <Input
                type="password"
                placeholder={t("enterPassword")}
                {...field}
              />

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? t("loggingIn") : t("login")}
        </Button>
      </form>
    </Form>
  );
};

export default LoginFormComponent;
