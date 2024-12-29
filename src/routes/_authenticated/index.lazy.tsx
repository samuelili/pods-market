import { createLazyFileRoute } from '@tanstack/react-router'
import Card from '@/components/card/Card.tsx'

export const Route = createLazyFileRoute('/_authenticated/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Card className={'p-4 mx-auto max-w-xl'}>Coming Soon!</Card>
}
