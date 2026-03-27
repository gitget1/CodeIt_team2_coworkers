import { useInfiniteQuery } from '@tanstack/react-query';
import { getComments } from '../api/getComments';
import { ARTICLE_QUERY_KEYS } from '../model/querykeys';
import { CommentList } from '../model/entities/comment.model';

export function useCommentList(articleId: number, limit = 10) {
  return useInfiniteQuery<CommentList>({
    queryKey: ARTICLE_QUERY_KEYS.comments(articleId),

    queryFn: ({ pageParam }) =>
      getComments({
        articleId,
        limit,
        cursor: pageParam as number | undefined,
      }),

    initialPageParam: undefined,

    getNextPageParam: (lastPage) => {
      return lastPage.nextCursor ?? undefined;
    },
  });
}
