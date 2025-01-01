import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

export const redirectSchema = z.object({
  redirect: z.string().nullable().optional(),
});

export const Route = createFileRoute('/login')({
  validateSearch: (search) => redirectSchema.parse(search),
});
