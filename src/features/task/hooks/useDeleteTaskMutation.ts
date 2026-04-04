import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { GROUP_QUERY_KEYS } from '@/features/group/lib/queryKeys';
import { TaskCommonParams } from '../model/params/task.params';
import { deleteTask } from '../api/deleteTask';
import { TASK_QUERY_KEYS } from '../lib/queryKeys';
import { TaskList } from '../model/entities/task.model';

type Params = TaskCommonParams & {
  date?: string;
};

export function useDeleteTaskMutation(params: Params) {
  const queryClient = useQueryClient();
  const listQueryKey = TASK_QUERY_KEYS.list({
    groupId: params.groupId,
    taskListId: params.taskListId,
    date: params.date,
  });

  return useMutation({
    mutationFn: (taskId: number) =>
      deleteTask({ groupId: params.groupId, taskListId: params.taskListId, taskId }),

    onSuccess: (result) => {
      if (!result.ok) return;
      toast.success('할 일을 삭제했습니다.');
    },

    onMutate: async (taskId) => {
      await queryClient.cancelQueries({ queryKey: listQueryKey });
      const previous = queryClient.getQueryData<TaskList>(listQueryKey);
      queryClient.setQueryData<TaskList>(listQueryKey, (old) => {
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
        queryClient.setQueryData(listQueryKey, context.previous);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: TASK_QUERY_KEYS.lists(params.groupId) });
      queryClient.invalidateQueries({
        queryKey: GROUP_QUERY_KEYS.detail(params.groupId),
      });
    },
  });
}
