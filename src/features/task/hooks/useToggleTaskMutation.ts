import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleTask } from '../api/toggleTask';
import { TASK_QUERY_KEYS } from '../lib/queryKeys';
import { TaskCommonParams } from '../model/params/task.params';

type ToggleTaskParams = TaskCommonParams & {
  taskId: number;
  done: boolean;
};

export function useToggleTaskMutation(params: TaskCommonParams) {
  const queryClient = useQueryClient();
  const queryKey = TASK_QUERY_KEYS.lists(params.groupId);

  return useMutation({
    mutationFn: toggleTask,

    onMutate: async (variables: ToggleTaskParams) => {
      const { taskId } = variables;

      await queryClient.cancelQueries({ queryKey });

      const previousData = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(queryKey, (old: any) => {
        if (!old) return old;

        return {
          ...old,
          tasks: old.tasks.map((task: any) =>
            task.id === taskId
              ? {
                  ...task,
                  isCompleted: variables.done,
                  doneAt: task.doneAt ? null : new Date().toISOString(),
                }
              : task,
          ),
        };
      });

      return { previousData };
    },

    onError: (_error, _variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(queryKey, context.previousData);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
}
