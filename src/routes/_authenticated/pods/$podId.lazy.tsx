import { createLazyFileRoute } from '@tanstack/react-router'
import PodPage from '@/components/pod/PodPage.tsx'

export const Route = createLazyFileRoute('/_authenticated/pods/$podId')({
  component: PodPage,
})
