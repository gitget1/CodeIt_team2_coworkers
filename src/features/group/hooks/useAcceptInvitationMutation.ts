import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  acceptGroupInvitation,
  type AcceptGroupInvitationParams,
} from '../api/acceptGroupInvitation';
import { USER_QUERY_KEYS } from '@/features/user/lib/queryKeys';
import type { ApiError } from '@/shared/types/apiError';

export function useAcceptInvitationMutation() {
  const queryClient = useQueryClient();
  return useMutation<{ groupId: number }, ApiError, AcceptGroupInvitationParams>({
    mutationFn: acceptGroupInvitation,
    onSuccess: () => {
      //  내 그룹 목록 새로고침
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.groups() });
    },
  });
}
