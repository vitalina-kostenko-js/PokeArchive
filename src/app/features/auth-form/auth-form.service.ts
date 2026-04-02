import { LoginFormValues, RegisterFormValues } from './auth-form.schema'

export type LoginSuccess = {
  token: string
  user: { id: string; name: string; email?: string }
}

export type LoginResult = LoginSuccess | { error: string }

// register user
export const registerUser = async (values: RegisterFormValues) => {
  const res = await fetch('/auth/sign-up', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: values.name,
      email: values.email,
      password: values.password,
    }),
  })

  const data = await res.json().catch(() => ({}))

  if (!res.ok) {
    throw new Error(data?.error ?? 'Registration failed')
  }

  return data
}

// login user
export const loginUser = async (values: LoginFormValues): Promise<LoginResult> => {
  const res = await fetch('/auth/sign-in', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: values.email,
      password: values.password,
    }),
  })

  const data = (await res.json().catch(() => ({}))) as Partial<LoginSuccess> & { error?: string }

  if (!res.ok) {
    return { error: data?.error ?? 'Login failed' }
  }

  if (!data.token || !data.user?.id) {
    return { error: 'Login failed' }
  }

  return { token: data.token, user: data.user as LoginSuccess['user'] }
}

// logout
export const logoutUser = async () => {
  await fetch('/auth/sign-out', { method: 'POST' })
}
