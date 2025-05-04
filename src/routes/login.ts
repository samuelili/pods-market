import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

export const redirectSchema = z.optional(
  z.object({
    redirect: z.string().optional(),
    join: z.string().optional(),
  }),
);

export const Route = createFileRoute('/login')({
  validateSearch: (search) => redirectSchema.parse(search),
});
