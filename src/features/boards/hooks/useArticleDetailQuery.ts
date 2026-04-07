import { useQuery } from '@tanstack/react-query';
import { getArticleDetail } from '../api/getArticleDetail';
import { ARTICLE_QUERY_KEYS } from '../model/querykeys';

export function useArticleDetailQuery(articleId?: number) {
  const isValidId = Number.isFinite(articleId) && articleId! > 0;

  return useQuery({
    queryKey: ARTICLE_QUERY_KEYS.detail(articleId as number),
    queryFn: () => getArticleDetail(articleId as number),
    enabled: isValidId,
    staleTime: 1000 * 60 * 5,
  });
}
