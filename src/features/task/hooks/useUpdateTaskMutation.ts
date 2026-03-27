import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTask } from '../api/updateTask';
import { TASK_QUERY_KEYS } from '../lib/queryKeys';
import { TaskCommonParams } from '../model/params/task.params';
import type { CreateTaskParams } from '../model/params/task.create.params';

type UseUpdateTaskMutationParams = TaskCommonParams & {
  date?: string;
};

export function useUpdateTaskMutation(params: UseUpdateTaskMutationParams) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ taskId, body }: { taskId: number; body: CreateTaskParams }) => {
      const path = {
        groupId: params.groupId,
        taskListId: params.taskListId,
        taskId,
      };

      return updateTask(path, body);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: TASK_QUERY_KEYS.lists(params.groupId),
      });
    },
  });
}
