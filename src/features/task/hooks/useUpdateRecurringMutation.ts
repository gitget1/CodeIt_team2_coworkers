import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateRecurring } from '../api/updateRecurring';
import { TASK_QUERY_KEYS } from '../lib/queryKeys';
import { TaskCommonParams } from '../model/params/task.params';
import { RecurrenceType } from '../model/types/recurrence.type';

type UpdateRecurringParams = {
  name?: string;
  description?: string;
  startDate?: Date;
  frequencyType?: RecurrenceType;
  monthDay?: number;
  weekDay?: number[];
};

type UseUpdateRecurringMutationParams = TaskCommonParams & {};

export function useUpdateRecurringMutation(params: UseUpdateRecurringMutationParams) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ recurringId, body }: { recurringId: number; body: UpdateRecurringParams }) => {
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
        refetchType: 'active',
      });
    },
  });
}
