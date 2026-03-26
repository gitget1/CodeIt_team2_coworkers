import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTask } from '../api/createTask';
import { TASK_QUERY_KEYS } from '../lib/queryKeys';
import { TaskCommonParams } from '../model/params/task.params';
import { createRecurring } from '../api/createRecurring';
import { CreateRecurringParams, CreateTaskParams } from '../model/params/task.create.params';

type UseCreateTaskMutationParams = TaskCommonParams & {
  date?: string;
};

export function useCreateTaskMutation(params: UseCreateTaskMutationParams) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: CreateTaskParams | CreateRecurringParams) => {
      const path = {
        groupId: params.groupId,
        taskListId: params.taskListId,
      };

      if (body.frequencyType === 'ONCE') {
        return createTask(path, body);
      }

      return createRecurring(path, body);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: TASK_QUERY_KEYS.lists(params.groupId),
      });
    },
  });
}
