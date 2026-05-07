import { LoginButtonComponent, RegisterButtonComponent } from '@/app/shared/components/auth-button/elements'

//component
const AuthButtonComponent = () => {
  //render
  return (
    <div>
      <LoginButtonComponent />
      <RegisterButtonComponent />
    </div>
  )
}

export default AuthButtonComponent
