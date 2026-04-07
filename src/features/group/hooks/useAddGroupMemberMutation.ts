import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addGroupMember, type AddGroupMemberParams } from '../api/addGroupMember';
import { GROUP_QUERY_KEYS } from '../lib/queryKeys';
import type { ApiError } from '@/shared/types/apiError';

export function useAddGroupMemberMutation() {
  const queryClient = useQueryClient();
  return useMutation<void, ApiError, AddGroupMemberParams>({
    mutationFn: addGroupMember,
    onSuccess: (_, variables) => {
      // 그룹의 상세 정보와 멤버 목록 새로고침
      queryClient.invalidateQueries({ queryKey: GROUP_QUERY_KEYS.detail(variables.groupId) });
    },
  });
}
