import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateRecurring } from '../api/updateRecurring';
import { TASK_QUERY_KEYS } from '../lib/queryKeys';
import { TaskCommonParams } from '../model/params/task.params';
import { CreateRecurringParams } from '../model/params/task.create.params';

type UseUpdateRecurringMutationParams = TaskCommonParams & {
};

export function useUpdateRecurringMutation(params: UseUpdateRecurringMutationParams) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ recurringId, body }: { recurringId: number; body: CreateRecurringParams }) => {
      return updateRecurring(
        {
          groupId: params.groupId,
          taskListId: params.taskListId,
          recurringId,
        },
        body,
      );
    },

    onSuccess: (result) => {
      if (!result.ok) return;

      queryClient.invalidateQueries({
        queryKey: TASK_QUERY_KEYS.lists(params.groupId),
      });
    },
  });
}
