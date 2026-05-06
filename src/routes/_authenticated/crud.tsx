import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/crud')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/crud"!</div>
}
