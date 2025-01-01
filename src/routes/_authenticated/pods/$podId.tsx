import { createFileRoute } from '@tanstack/react-router';
import { additionalContentSchema } from '@/misc/validateAdditionalContentSearch.ts';
import { getPod } from '@/logic/store/pods.ts';

export const Route = createFileRoute('/_authenticated/pods/$podId')({
  async loader({ params }) {
    return await getPod(params.podId);
  },
  validateSearch: (search) => additionalContentSchema.parse(search),
});
