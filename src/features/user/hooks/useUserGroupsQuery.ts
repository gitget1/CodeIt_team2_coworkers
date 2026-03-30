import { useQuery } from '@tanstack/react-query';
import { getUserGroups } from '../api/getUserGroups';
import { USER_QUERY_KEYS } from '../lib/queryKeys';
import { ApiError } from '@/shared/types/apiError';
import type { MembershipGroup } from '../model/entities/user.model';

type UseUserGroupsQueryOptions = {
  /** false면 요청하지 않음(예: 비로그인 사이드바) */
  enabled?: boolean;
};

export function useUserGroupsQuery(options?: UseUserGroupsQueryOptions) {
  const { enabled = true } = options ?? {};

  return useQuery<MembershipGroup[], ApiError>({
    queryKey: USER_QUERY_KEYS.groups(),
    queryFn: getUserGroups,
    enabled,
  });
}
