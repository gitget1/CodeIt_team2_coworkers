import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleTask } from '../api/toggleTask';
import { TASK_QUERY_KEYS } from '../lib/queryKeys';
import { TaskCommonParams } from '../model/params/task.params';

export function useToggleTaskMutation(params: TaskCommonParams) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleTask,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: TASK_QUERY_KEYS.lists(params.groupId),
      });
    },
  });
}
