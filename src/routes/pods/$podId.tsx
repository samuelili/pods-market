import { createFileRoute } from '@tanstack/react-router';
import { additionalContentSchema } from '@/misc/validateAdditionalContentSearch.ts';

export const Route = createFileRoute('/pods/$podId')({
  validateSearch: (search) => additionalContentSchema.parse(search),
});
