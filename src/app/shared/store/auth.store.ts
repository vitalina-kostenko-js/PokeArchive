import { create } from 'zustand'
import { persist } from 'zustand/middleware'

//interface
interface IAuthStore {
  token: string | null
  user: { id: string; name: string; email?: string; image?: string | null } | null
  setSession: (token: string, user: IAuthStore['user']) => void
  clearSession: () => void
}

//store
export const useAuthStore = create<IAuthStore>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setSession: (token, user) => set({ token, user }),
      clearSession: () => set({ token: null, user: null }),
    }),
    {
      name: 'auth-session',
    },
  ),
)
