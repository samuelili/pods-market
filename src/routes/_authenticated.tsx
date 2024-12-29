import { createFileRoute, redirect } from '@tanstack/react-router';
import { checkUserPromise, user } from '@/logic/auth.ts';

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ location }) => {
    await checkUserPromise;

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
