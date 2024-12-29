import { createFileRoute } from '@tanstack/react-router'
import { additionalContentSchema } from '@/misc/validateAdditionalContentSearch.ts'

export const Route = createFileRoute('/_authenticated/pods/$podId')({
  validateSearch: (search) => additionalContentSchema.parse(search),
})
