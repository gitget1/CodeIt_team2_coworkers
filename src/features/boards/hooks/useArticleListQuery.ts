import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getArticleList } from '../api/getArticleList';

export const ARTICLE_QUERY_KEYS = {
  all: ['articles'] as const,
  list: (params: { orderBy?: string; keyword?: string }) =>
    [...ARTICLE_QUERY_KEYS.all, params] as const,
};

export function useArticleListQuery(params: { orderBy?: 'recent' | 'like'; keyword?: string }) {
  return useQuery({
    queryKey: ARTICLE_QUERY_KEYS.list(params),
    queryFn: () => getArticleList(params),
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
  });
}
