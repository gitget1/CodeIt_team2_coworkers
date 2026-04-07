import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateComment } from '../api/updateComment';
import { toast } from 'sonner';
import { ARTICLE_QUERY_KEYS } from '../model/querykeys';

export function useUpdateComment(articleId: number) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: updateComment,
  });

  const updateCommentHandler = (commentId: number, content: string) => {
    mutate(
      { commentId, content },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ARTICLE_QUERY_KEYS.comments(articleId),
          });
          toast.success('댓글이 수정되었습니다.');
        },
      },
    );
  };

  return {
    updateComment: updateCommentHandler,
    isUpdating: isPending,
  };
}
