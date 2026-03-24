import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteGroup, type DeleteGroupParams } from '../api/deleteGroup';
import { GROUP_QUERY_KEYS } from '../lib/queryKeys';
import { USER_QUERY_KEYS } from '@/features/user/lib/queryKeys';
import type { ApiError } from '@/shared/types/apiError';

export function useDeleteGroupMutation() {
  const queryClient = useQueryClient();
  return useMutation<void, ApiError, DeleteGroupParams>({
    mutationFn: deleteGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: GROUP_QUERY_KEYS.all });
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.groups() }); // 내 목록에서도 삭제
    },
  });
}
