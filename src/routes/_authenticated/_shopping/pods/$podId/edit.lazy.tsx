import { createLazyFileRoute } from '@tanstack/react-router'
import PodEditPage from '@/components/pod/edit/PodEditPage.tsx'

export const Route = createLazyFileRoute(
  '/_authenticated/_shopping/pods/$podId/edit',
)({
  component: PodEditPage,
})
