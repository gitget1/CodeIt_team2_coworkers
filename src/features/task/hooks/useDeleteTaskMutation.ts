import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TaskCommonParams } from '../model/params/task.params';
import { deleteTask } from '../api/deleteTask';
import { TASK_QUERY_KEYS } from '../lib/queryKeys';

export function useDeleteTaskMutation(params: TaskCommonParams) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (taskId: number) =>
      deleteTask({ groupId: params.groupId, taskListId: params.taskListId, taskId }),

    onSuccess: (result) => {
      if (!result.ok) return;
      queryClient.invalidateQueries({
        queryKey: TASK_QUERY_KEYS.lists(params.groupId),
      });
    },
  });
}
