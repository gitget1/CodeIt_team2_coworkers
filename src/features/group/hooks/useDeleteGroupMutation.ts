import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteGroup, type DeleteGroupParams } from '../api/deleteGroup';
import { GROUP_QUERY_KEYS } from '../lib/queryKeys';
import { USER_QUERY_KEYS } from '@/features/user/lib/queryKeys';
import type { MembershipGroup } from '@/features/user/model/entities/user.model';
import type { ApiError } from '@/shared/types/apiError';

export function useDeleteGroupMutation() {
  const queryClient = useQueryClient();
  return useMutation<void, ApiError, DeleteGroupParams>({
    mutationFn: deleteGroup,
    onSuccess: (_, { groupId }) => {
      // invalidateQueries로 refetch가 따로 돌면 사이드바·페이지 갱신 시점이 어긋남.
      // 삭제 직후 한 번에 캐시를 맞춤 (동기 setQueryData + removeQueries).
      queryClient.setQueryData<MembershipGroup[]>(USER_QUERY_KEYS.groups(), (prev) =>
        prev ? prev.filter((g) => g.id !== groupId) : prev,
      );
      queryClient.removeQueries({
        predicate: (query) => {
          const k = query.queryKey;
          return (
            Array.isArray(k) &&
            k[0] === GROUP_QUERY_KEYS.all[0] &&
            k[1] === 'detail' &&
            k[2] === groupId
          );
        },
      });
    },
  });
}
