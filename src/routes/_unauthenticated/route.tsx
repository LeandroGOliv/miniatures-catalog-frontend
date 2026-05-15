import { useAuthStore } from '#/store/authStore'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_unauthenticated')({
  beforeLoad: async () => {
    const { token, logout } = useAuthStore.getState()
    if (token) {
      throw redirect({
        to: '/crud',
      })
    }
  },
})
