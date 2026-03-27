import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getArticleList } from '../api/getArticleList';
import { ARTICLE_QUERY_KEYS } from '../model/querykeys';


export function useArticleListQuery(params: { orderBy?: 'recent' | 'like'; keyword?: string }) {
  return useQuery({
    queryKey: ARTICLE_QUERY_KEYS.list(params),
    queryFn: () => getArticleList(params),
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
  });
}
