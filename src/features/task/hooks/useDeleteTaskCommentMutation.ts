import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { deleteTaskComment } from '../api/deleteTaskComment';
import { TASK_QUERY_KEYS } from '../lib/queryKeys';
import type { TaskComment } from '../model/entities/taskComment.model';
import type { TaskCommonParams } from '../model/params/task.params';

type Params = TaskCommonParams & {
  taskId: number;
  listDateIso?: string;
};

export function useDeleteTaskCommentMutation({ taskId, groupId, taskListId, listDateIso }: Params) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: number) => deleteTaskComment(taskId, commentId),
    onMutate: async (commentId) => {
      await queryClient.cancelQueries({ queryKey: TASK_QUERY_KEYS.comments(taskId) });
      const previous = queryClient.getQueryData<TaskComment[]>(TASK_QUERY_KEYS.comments(taskId));
      if (previous) {
        queryClient.setQueryData<TaskComment[]>(
          TASK_QUERY_KEYS.comments(taskId),
          previous.filter((c) => c.id !== commentId),
        );
      }
      return { previous };
    },
    onError: (_err, _commentId, context) => {
      if (context?.previous) {
        queryClient.setQueryData(TASK_QUERY_KEYS.comments(taskId), context.previous);
      }
    },
    onSuccess: () => {
      toast.success('댓글을 삭제했습니다.');
      queryClient.invalidateQueries({ queryKey: TASK_QUERY_KEYS.comments(taskId) });
      queryClient.invalidateQueries({ queryKey: TASK_QUERY_KEYS.lists(groupId) });
      if (listDateIso) {
        queryClient.invalidateQueries({
          queryKey: TASK_QUERY_KEYS.list({ groupId, taskListId, date: listDateIso }),
        });
      }
    },
  });
}
