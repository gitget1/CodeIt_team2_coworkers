import { useInfiniteQuery } from '@tanstack/react-query';
import { getComments } from '../api/getComments';
import { ARTICLE_QUERY_KEYS } from '../model/querykeys';
import { CommentList } from '../model/entities/comment.model';

export function useCommentList(articleId: number, limit = 10) {
  const isValidId = Number.isFinite(articleId) && articleId > 0;

  const query = useInfiniteQuery<CommentList>({
    queryKey: isValidId ? ARTICLE_QUERY_KEYS.comments(articleId) : ['comments', 'invalid'],
    queryFn: ({ pageParam }) =>
      getComments({
        articleId,
        limit,
        cursor: pageParam as number | undefined,
      }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    enabled: isValidId,
  });

  const comments = query.data?.pages.flatMap((page) => page.list) ?? [];

  return { ...query, comments };
}
