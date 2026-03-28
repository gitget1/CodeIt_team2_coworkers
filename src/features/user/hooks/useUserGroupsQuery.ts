import { useQuery } from '@tanstack/react-query';
import { getUserGroups } from '../api/getUserGroups';
import { USER_QUERY_KEYS } from '../lib/queryKeys';
import { ApiError } from '@/shared/types/apiError';
import type { MembershipGroup } from '../model/entities/user.model';

export function useUserGroupsQuery() {
  return useQuery<MembershipGroup[], ApiError>({
    queryKey: USER_QUERY_KEYS.groups(),
    queryFn: getUserGroups,
  });
}
