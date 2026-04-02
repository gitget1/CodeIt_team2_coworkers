import { useQuery } from '@tanstack/react-query';
import { getGroup } from '../api/getGroup';
import { GROUP_QUERY_KEYS } from '../lib/queryKeys';
import type { ApiError } from '@/shared/types/apiError';
import type { GroupDetail } from '../model/entities/group.model';

export type UseGroupQueryOptions = {
  /** `router.isReady` 등과 결합해 조회 시점을 제어할 때 사용 */
  enabled?: boolean;
};

export function useGroupQuery(groupId: number, options?: UseGroupQueryOptions) {
  const idOk = Number.isFinite(groupId) && groupId > 0;
  const enabled = idOk && (options?.enabled ?? true);
  return useQuery<GroupDetail, ApiError>({
    queryKey: GROUP_QUERY_KEYS.detail(groupId),
    queryFn: () => getGroup({ groupId }),
    enabled,
  });
}
