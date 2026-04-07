import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { updateTaskComment } from '../api/updateTaskComment';
import { TASK_QUERY_KEYS } from '../lib/queryKeys';
import type { TaskCommonParams } from '../model/params/task.params';

type Params = TaskCommonParams & {
  taskId: number;
  listDateIso?: string;
};

export function useUpdateTaskCommentMutation({ taskId, groupId, taskListId, listDateIso }: Params) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ commentId, content }: { commentId: number; content: string }) =>
      updateTaskComment(taskId, commentId, { content: content.trim() }),
    onSuccess: () => {
      toast.success('댓글을 수정했습니다.');
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
