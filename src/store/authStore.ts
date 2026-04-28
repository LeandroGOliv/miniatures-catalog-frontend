import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type AuthStore = {
  user: string | null
  token: string | null
  login: (user: string, token: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      login: (user, token) => set({ user, token }),
      logout: () => set({ user: null, token: null }),
    }),
    {
      name: 'auth-storage',
    },
  ),
)
