import { createFileRoute } from '@tanstack/react-router'
import { additionalContentSchema } from '@/misc/validateAdditionalContentSearch.ts'

export const Route = createFileRoute('/_authenticated/_shopping/pods/all')({
  validateSearch: (search) => additionalContentSchema.parse(search),
})
