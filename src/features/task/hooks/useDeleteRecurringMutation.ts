import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteRecurring } from '../api/deleteRecurring';
import { TASK_QUERY_KEYS } from '../lib/queryKeys';
import type { TaskCommonParams } from '../model/params/task.params';

type UseDeleteRecurringMutationParams = TaskCommonParams;

export function useDeleteRecurringMutation(params: UseDeleteRecurringMutationParams) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ taskId, recurringId }: { taskId: number; recurringId: number }) =>
      deleteRecurring({
        groupId: params.groupId,
        taskListId: params.taskListId,
        taskId,
        recurringId,
      }),

    onSuccess: (result) => {
      if (!result.ok) return;
      queryClient.invalidateQueries({
        queryKey: TASK_QUERY_KEYS.lists(params.groupId),
        refetchType: 'active',
      });
    },
  });
}
