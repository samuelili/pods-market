import { createLazyFileRoute } from '@tanstack/react-router'
import CreateListing from '@/components/create/CreateListing.tsx'

export const Route = createLazyFileRoute('/_authenticated/create/listing')({
  component: CreateListing,
})
