import { TLoginFormValues, TRegisterFormValues } from '@/app/entities/models'
import { restApiFetcher } from '@/pkg/rest-api/fetcher'

//interface
interface ILoginSuccess {
  token: string
  user: { id: string; name: string; email?: string }
}

interface ILoginError {
  error: string
}

interface IRegisterSuccess {
  success: boolean
}

//type
type TLoginResult = ILoginSuccess | ILoginError
type TRegisterResult = IRegisterSuccess | ILoginError

// register user
export const registerUser = async (values: TRegisterFormValues): Promise<TRegisterResult> => {
  const data = await restApiFetcher
    .post('auth/sign-up', {
      json: { name: values.name, email: values.email, password: values.password },
    })
    .json<TRegisterResult>()

  //render
  return data
}

// login user
export const loginUser = async (values: TLoginFormValues): Promise<TLoginResult> => {
  const data = await restApiFetcher
    .post('auth/sign-in', {
      json: { email: values.email, password: values.password },
    })
    .json<ILoginSuccess>()

  //render
  return data
}
