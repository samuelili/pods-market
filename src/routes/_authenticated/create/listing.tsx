import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

const createListingSchema = z.optional(
  z.object({
    podId: z.optional(z.string()),
  }),
);

export const Route = createFileRoute('/_authenticated/create/listing')({
  validateSearch: (search) => createListingSchema.parse(search),
});
