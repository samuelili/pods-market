import { createLazyFileRoute } from '@tanstack/react-router'
import CreatePage from '@/components/create/CreatePage.tsx'

export const Route = createLazyFileRoute('/_authenticated/create')({
  component: CreatePage,
})
