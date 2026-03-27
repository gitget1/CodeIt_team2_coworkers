import { useQuery } from '@tanstack/react-query';
import { getArticleDetail } from '../api/getArticleDetail';
import { ARTICLE_QUERY_KEYS } from '../model/querykeys';

export function useArticleDetailQuery(articleId?: number) {
  return useQuery({
    queryKey: ARTICLE_QUERY_KEYS.detail(articleId ?? 0),
    queryFn: () => getArticleDetail(articleId!),
    enabled: !!articleId,
    staleTime: 1000 * 60 * 5,
  });
}
