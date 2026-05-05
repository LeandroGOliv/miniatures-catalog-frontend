import LoginForm from '#/components/pages/Login/LoginForm'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_unauthenticated/login')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="w-dvw h-dvh flex justify-center items-center">
      <div className="max-lg:w-80 w-md p-6">
        <LoginForm />
      </div>
    </div>
  )
}
