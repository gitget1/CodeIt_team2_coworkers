import { keepPreviousData, useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getArticleList } from '../api/getArticleList';
import { ARTICLE_QUERY_KEYS } from '../model/querykeys';

export function useArticleListQuery(params: { orderBy?: 'recent' | 'like'; keyword?: string }) {
  return useInfiniteQuery({
    queryKey: ['articles', params],
    queryFn: ({ pageParam = 1 }) => getArticleList({ ...params, page: pageParam, pageSize: 10 }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const hasMore = lastPage.list.length === 10;
      return hasMore ? allPages.length + 1 : undefined;
    },
  });
}
