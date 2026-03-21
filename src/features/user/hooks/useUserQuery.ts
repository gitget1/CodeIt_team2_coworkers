import { useQuery } from '@tanstack/react-query';
import { getUser } from '../api/getUser';
import { USER_QUERY_KEYS } from '../lib/queryKeys';
import { ApiError } from '@/shared/types/apiError';
import { UserProfile } from '../model/entities/user.model';

export function useUserQuery() {
  return useQuery<UserProfile, ApiError>({
    queryKey: USER_QUERY_KEYS.me(),
    queryFn: () => getUser(),
  });
}
