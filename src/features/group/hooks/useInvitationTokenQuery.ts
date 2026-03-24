import { useQuery } from '@tanstack/react-query';
import { getInvitationToken } from '../api/getInvitationToken';
import { GROUP_QUERY_KEYS } from '../lib/queryKeys';
import type { ApiError } from '@/shared/types/apiError';

// 초대 토큰 발급
export function useInvitationTokenQuery(groupId: number, enabled: boolean = false) {
  return useQuery<string, ApiError>({
    queryKey: [...GROUP_QUERY_KEYS.detail(groupId), 'invitationToken'],
    queryFn: () => getInvitationToken({ groupId }),
    enabled: !!groupId && enabled,
  });
}
