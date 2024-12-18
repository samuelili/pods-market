import { createLazyFileRoute } from '@tanstack/react-router'
import CreatePage from '@/components/create/CreatePage.tsx'

export const Route = createLazyFileRoute('/create')({
  component: CreatePage,
})
