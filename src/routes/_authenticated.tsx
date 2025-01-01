import { createFileRoute, redirect } from '@tanstack/react-router';
import { getQueryClient } from '@/logic/queryClient.ts';
import queries from '@/logic/queries.ts';

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ location }) => {
    const user = await getQueryClient().ensureQueryData(queries.users.current);

    if (user === null) {
      throw redirect({
        to: '/login',
        search: {
          // Use the current location to power a redirect after login
          // (Do not use `router.state.resolvedLocation` as it can
          // potentially lag behind the actual current location)
          redirect: location.href,
        },
      });
    }
  },
});
