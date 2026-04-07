import { useQuery } from '@tanstack/react-query';
import { getGroupMember } from '../api/getGroupMember';
import { GROUP_QUERY_KEYS } from '../lib/queryKeys';
import type { GroupMember } from '../model/entities/group.model';
import type { ApiError } from '@/shared/types/apiError';

// 멤버 조회
export function useGroupMemberQuery(groupId: number, memberUserId: number) {
  return useQuery<GroupMember, ApiError>({
    queryKey: GROUP_QUERY_KEYS.member(groupId, memberUserId),
    queryFn: () => getGroupMember({ groupId, memberUserId }),
    enabled: !!groupId && !!memberUserId,
  });
}
