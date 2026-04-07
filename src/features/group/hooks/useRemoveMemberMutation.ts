import { useMutation, useQueryClient } from '@tanstack/react-query';
import { removeGroupMember, type RemoveGroupMemberParams } from '../api/removeGroupMember';
import { GROUP_QUERY_KEYS } from '../lib/queryKeys';
import type { GroupDetail } from '../model/entities/group.model';
import type { ApiError } from '@/shared/types/apiError';

type RemoveMemberContext = {
  previousGroupDetail: GroupDetail | undefined;
  detailQueryKey: readonly unknown[];
};

export function useRemoveGroupMemberMutation() {
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, RemoveGroupMemberParams, RemoveMemberContext>({
    mutationFn: removeGroupMember,

    onMutate: async (variables) => {
      const detailQueryKey = GROUP_QUERY_KEYS.detail(variables.groupId);

      await queryClient.cancelQueries({ queryKey: detailQueryKey });
      const previousGroupDetail = queryClient.getQueryData<GroupDetail>(detailQueryKey);

      if (previousGroupDetail) {
        queryClient.setQueryData<GroupDetail>(detailQueryKey, {
          ...previousGroupDetail,
          members: previousGroupDetail.members.filter(
            (member) => member.userId !== variables.memberUserId,
          ),
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
      queryClient.invalidateQueries({ queryKey: GROUP_QUERY_KEYS.members(variables.groupId) });
    },
  });
}
