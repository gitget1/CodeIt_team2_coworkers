import { useQuery } from '@tanstack/react-query';
import { getUser } from '../api/getUser';
import { USER_QUERY_KEYS } from '../lib/queryKeys';
import { UserProfile } from '../model/entities/user.model';
import { isAxiosError } from 'axios';

export function useUserQuery() {
  return useQuery<UserProfile | null>({
    queryKey: USER_QUERY_KEYS.me(),
    queryFn: async () => {
      try {
        return await getUser();
      } catch (error) {
        if (isAxiosError(error) && error.response?.status === 401) {
          return null;
        }
        throw error;
      }
    },
    retry: false,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
}
