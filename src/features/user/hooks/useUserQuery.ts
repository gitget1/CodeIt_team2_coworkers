import { useQuery } from '@tanstack/react-query';
import { getUser } from '../api/getUser';
import { USER_QUERY_KEYS } from '../lib/queryKeys';

export function useUserQuery() {
  return useQuery({
    queryKey: USER_QUERY_KEYS.me(),
    queryFn: () => getUser(),
  });
}
