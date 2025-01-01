import { createLazyFileRoute } from '@tanstack/react-router'
import AuthenticatedLayout from '@/components/AuthenticatedLayout.tsx'

export const Route = createLazyFileRoute('/_authenticated')({
  component: AuthenticatedLayout,
})
