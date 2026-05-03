import LoginForm from '#/components/pages/Login/LoginForm'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_unauthenticated/login')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <LoginForm />
    </>
  )
}
