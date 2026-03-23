import { useQuery } from '@tanstack/react-query';
import { getGroup } from '../api/getGroup';
import { GROUP_QUERY_KEYS } from '../lib/queryKeys';
import type { ApiError } from '@/shared/types/apiError';
import type { GroupDetail } from '../model/entities/group.model';

export function useGroupQuery(groupId: number) {
  // 성공타입/ 에러타입
  return useQuery<GroupDetail, ApiError>({
    queryKey: GROUP_QUERY_KEYS.detail(groupId),
    queryFn: () => getGroup({ groupId }),
    enabled: !!groupId,
  });
}
