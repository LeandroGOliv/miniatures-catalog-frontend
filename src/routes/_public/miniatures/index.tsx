import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_public/miniatures/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_public/miniatures/"!</div>
}
