import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTask } from '../api/updateTask';
import { TASK_QUERY_KEYS } from '../lib/queryKeys';
import { TaskCommonParams } from '../model/params/task.params';

type UpdateTaskParams = {
  name?: string;
  description?: string;
  done?: boolean;
};

type UseUpdateTaskMutationParams = TaskCommonParams & {
  date?: string;
};

export function useUpdateTaskMutation(params: UseUpdateTaskMutationParams) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ taskId, body }: { taskId: number; body: UpdateTaskParams }) => {
      return updateTask(
        {
          groupId: params.groupId,
          taskListId: params.taskListId,
          taskId,
        },
        body,
      );
    },

    onSuccess: (result) => {
      if (!result.ok) return;

      queryClient.invalidateQueries({
        queryKey: TASK_QUERY_KEYS.list({
          groupId: params.groupId,
          taskListId: params.taskListId,
          date: params.date,
        }),
        refetchType: 'active',
      });
    },
  });
}
