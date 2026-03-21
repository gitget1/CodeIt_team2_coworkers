import { useQuery } from '@tanstack/react-query';
import { getUserGroups } from '../api/getUserGroups';
import { USER_QUERY_KEYS } from '../lib/queryKeys';
import { ApiError } from '@/shared/types/apiError';
import { Membership } from '../model/entities/user.model';

export function useUserGroupsQuery() {
  return useQuery<Membership[], ApiError>({
    queryKey: USER_QUERY_KEYS.groups(),
    queryFn: getUserGroups,
  });
}
