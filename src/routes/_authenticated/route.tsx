import { createFileRoute, redirect } from '@tanstack/react-router'
import { useAuthStore } from '#/store/authStore'
import { isTokenExpired } from '#/utils/auth'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: () => {
    const { token, logout } = useAuthStore.getState()

    if (!token || isTokenExpired(token)) {
      logout()

      throw redirect({
        to: '/login',
      })
    }
  },
})
