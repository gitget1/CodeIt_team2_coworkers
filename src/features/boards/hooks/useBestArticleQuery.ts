import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { ARTICLE_QUERY_KEYS } from '../model/querykeys';
import { getArticleList } from '../api/getArticleList';

export function useBestArticleQuery(params: {
  orderBy?: 'recent' | 'like';
  keyword?: string;
  pageSize?: number;}) {
  return useQuery({
    queryKey: ARTICLE_QUERY_KEYS.list(params),
    queryFn: () => getArticleList(params),
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
  });
}
