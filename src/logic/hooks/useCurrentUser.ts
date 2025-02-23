import { useQuery, UseQueryResult } from '@tanstack/react-query';
import queries from '@/logic/queries.ts';
import { User } from '@/types/User.ts';

export const useCurrentUserUnsafe = (): [
  User | null,
  UseQueryResult<User | null>,
] => {
  const query = useQuery(queries.users.current);

  return [query.data ?? null, query];
};

const useCurrentUser = (): [User, UseQueryResult<User>] => {
  const [user, query] = useCurrentUserUnsafe() as [User, UseQueryResult<User>];
  return [user ?? {}, query];
};

export default useCurrentUser;
