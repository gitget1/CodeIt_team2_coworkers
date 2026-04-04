import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { GroupDetail } from '@/features/group/model/entities/group.model';
import { GROUP_QUERY_KEYS } from '@/features/group/lib/queryKeys';
import { toggleTask } from '../api/toggleTask';
import { TASK_QUERY_KEYS } from '../lib/queryKeys';
import { TaskCommonParams } from '../model/params/task.params';
import type { TaskList } from '../model/entities/task.model';

type ToggleTaskParams = TaskCommonParams & {
  taskId: number;
  done: boolean;
};

function patchTaskCompletion(
  list: TaskList,
  taskListId: number,
  taskId: number,
  done: boolean,
): TaskList {
  if (list.id !== taskListId) return list;
  return {
    ...list,
    tasks: list.tasks.map((task) =>
      task.id === taskId
        ? {
            ...task,
            isCompleted: done,
            completedAt: done ? new Date().toISOString() : undefined,
          }
        : task,
    ),
  };
}

export function useToggleTaskMutation(params: TaskCommonParams) {
  const queryClient = useQueryClient();
  const groupDetailKey = GROUP_QUERY_KEYS.detail(params.groupId);

  return useMutation({
    mutationFn: toggleTask,

    onMutate: async (variables: ToggleTaskParams) => {
      const { taskId, taskListId, done } = variables;
      const listQueryFilter = {
        queryKey: [...TASK_QUERY_KEYS.lists(params.groupId), taskListId],
      };

      await queryClient.cancelQueries(listQueryFilter);
      await queryClient.cancelQueries({ queryKey: groupDetailKey });

      const previousEntries = queryClient.getQueriesData<TaskList>(listQueryFilter);
      const previousGroup = queryClient.getQueryData<GroupDetail>(groupDetailKey);

      queryClient.setQueriesData<TaskList>(listQueryFilter, (old) => {
        if (!old) return old;
        return patchTaskCompletion(old, taskListId, taskId, done);
      });
      queryClient.setQueryData<GroupDetail>(groupDetailKey, (prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          taskLists: prev.taskLists.map((list) =>
            patchTaskCompletion(list, taskListId, taskId, done),
          ),
        };
      });

      return { previousEntries, previousGroup };
    },

    onError: (_error, _variables, context) => {
      context?.previousEntries?.forEach(([key, data]) => {
        queryClient.setQueryData(key, data);
      });
      if (context?.previousGroup !== undefined) {
        queryClient.setQueryData(groupDetailKey, context.previousGroup);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: TASK_QUERY_KEYS.lists(params.groupId) });
      queryClient.invalidateQueries({ queryKey: groupDetailKey });
    },
  });
}
