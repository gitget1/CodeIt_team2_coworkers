import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchGroup, type PatchGroupParams } from '../api/patchGroup';
import { GROUP_QUERY_KEYS } from '../lib/queryKeys';
import type { GroupDetail, Group } from '../model/entities/group.model';
import type { ApiError } from '@/shared/types/apiError';

type UpdateGroupContext = {
  previousGroupDetail: GroupDetail | undefined;
  detailQueryKey: readonly unknown[];
};

// 그룹 수정
export function useUpdateGroupMutation() {
  const queryClient = useQueryClient();

  return useMutation<Group, ApiError, PatchGroupParams, UpdateGroupContext>({
    mutationFn: patchGroup,

    onMutate: async (variables) => {
      const detailQueryKey = GROUP_QUERY_KEYS.detail(variables.groupId);

      await queryClient.cancelQueries({ queryKey: detailQueryKey });

      const previousGroupDetail = queryClient.getQueryData<GroupDetail>(detailQueryKey);

      if (previousGroupDetail) {
        queryClient.setQueryData<GroupDetail>(detailQueryKey, {
          ...previousGroupDetail,
          ...variables.body, // name, image 등 변경된 값
        });
      }

      return { previousGroupDetail, detailQueryKey };
    },

    onError: (error, variables, context) => {
      if (context?.previousGroupDetail) {
        queryClient.setQueryData(context.detailQueryKey, context.previousGroupDetail);
      }
    },

    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries({ queryKey: GROUP_QUERY_KEYS.detail(variables.groupId) });
      queryClient.invalidateQueries({ queryKey: GROUP_QUERY_KEYS.all });
    },
  });
}
