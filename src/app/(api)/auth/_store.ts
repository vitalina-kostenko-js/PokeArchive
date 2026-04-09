interface ILocalUser {
  id: string
  name: string
  email: string
  password: string
}

const g = global as unknown as { __localUsers: Map<string, ILocalUser> }
export const localUsers: Map<string, ILocalUser> = g.__localUsers ?? (g.__localUsers = new Map())

//Todo: hashing password
