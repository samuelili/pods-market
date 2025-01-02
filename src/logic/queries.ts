import { createQueryKeyStore } from '@lukemorales/query-key-factory';
import { getUser } from '@/logic/store/users.ts';
import { getPod, getPods } from '@/logic/store/pods.ts';
import { firstCheckPromise } from '@/logic/auth.ts';

const queries = createQueryKeyStore({
  users: {
    current: {
      queryKey: null,
      async queryFn() {
        const userId = await firstCheckPromise;
        if (!userId) return null;

        return await getUser(userId);
      },
    },
  },
  pods: {
    pod: (podId: string) => ({
      queryKey: [podId],
      queryFn() {
        return getPod(podId);
      },
    }),
    all: {
      queryKey: null,
      queryFn() {
        return getPods();
      },
    },
  },
});

export default queries;
