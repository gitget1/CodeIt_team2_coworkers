import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTask } from '../api/createTask';
import { TASK_QUERY_KEYS } from '../lib/queryKeys';
import { TaskCommonParams } from '../model/params/task.params';
import { CreateTaskParams } from '../model/params/create.params';

type UseCreateTaskMutationParams = TaskCommonParams & {
  date?: string;
};

export function useCreateTaskMutation(params: UseCreateTaskMutationParams) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: CreateTaskParams) =>
      createTask(
        {
          teamId: params.teamId,
          groupId: params.groupId,
          taskListId: params.taskListId,
        },
        body,
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: TASK_QUERY_KEYS.list(params),
      });
    },
  });
}
