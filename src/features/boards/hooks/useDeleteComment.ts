import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteComment } from '../api/deleteComment';
import { toast } from 'sonner';
import { ARTICLE_QUERY_KEYS } from '../model/querykeys';

export function useDeleteComment(articleId: number) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteComment,
  });

  const deleteCommentHandler = (commentId: number) => {
    mutate(commentId, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ARTICLE_QUERY_KEYS.comments(articleId),
        });

        queryClient.invalidateQueries({
          queryKey: ARTICLE_QUERY_KEYS.detail(articleId),
        });

        toast.success('댓글이 삭제되었습니다.');
      },
    });
  };

  return {
    deleteComment: deleteCommentHandler,
    isDeleting: isPending,
  };
}
