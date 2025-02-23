import { createQueryKeyStore } from '@lukemorales/query-key-factory';
import { getUser } from '@/logic/store/users.ts';
import { getPod, getPods } from '@/logic/store/pods.ts';
import { firstCheckPromise, userId as globalUserId } from '@/logic/auth.ts';
import { getAllListings, getListing, getPodListings } from './store/listings';
import { getAllRequests } from '@/logic/store/requests.ts';

const queries = createQueryKeyStore({
  users: {
    current: {
      queryKey: null,
      async queryFn() {
        const promiseUserId = await firstCheckPromise;
        const userId = globalUserId || promiseUserId;
        if (!userId) return null;

        return await getUser(userId);
      },
    },
    user: (userId: string) => ({
      queryKey: [userId],
      queryFn() {
        return getUser(userId);
      },
    }),
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
  listings: {
    listing: (listingId: string) => ({
      queryKey: [listingId],
      queryFn() {
        return getListing(listingId);
      },
    }),
    pod: (podId: string) => ({
      queryKey: [podId],
      queryFn() {
        return getPodListings(podId);
      },
    }),
    all: {
      queryKey: null,
      queryFn() {
        return getAllListings();
      },
    },
  },
  requests: {
    all: {
      queryKey: null,
      queryFn() {
        return getAllRequests();
      },
    },
  },
});

export default queries;
