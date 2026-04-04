import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GROUP_QUERY_KEYS } from '@/features/group/lib/queryKeys';
import { TaskCommonParams } from '../model/params/task.params';
import { deleteTask } from '../api/deleteTask';
import { TASK_QUERY_KEYS } from '../lib/queryKeys';
import { TaskList } from '../model/entities/task.model';

export function useDeleteTaskMutation(params: TaskCommonParams) {
  const queryClient = useQueryClient();
  const queryKey = TASK_QUERY_KEYS.lists(params.groupId);

  return useMutation({
    mutationFn: (taskId: number) =>
      deleteTask({ groupId: params.groupId, taskListId: params.taskListId, taskId }),

    onMutate: async (taskId) => {
      await queryClient.cancelQueries({ queryKey });
      const previous = queryClient.getQueryData<TaskList>(queryKey);
      queryClient.setQueryData<TaskList>(queryKey, (old) => {
        if (!old) return old;
        return {
          ...old,
          tasks: old.tasks.filter((task) => task.id !== taskId),
        };
      });
      return { previous };
    },

    onError: (_err, _taskId, context) => {
      if (context?.previous) {
        queryClient.setQueryData(queryKey, context.previous);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
      queryClient.invalidateQueries({
        queryKey: GROUP_QUERY_KEYS.detail(params.groupId),
      });
    },
  });
}
