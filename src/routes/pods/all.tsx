import { createFileRoute } from '@tanstack/react-router'
import { additionalContentSchema } from '@/misc/validateAdditionalContentSearch.ts'

export const Route = createFileRoute('/pods/all')({
  validateSearch: (search) => additionalContentSchema.parse(search),
})
