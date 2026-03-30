import { useQuery } from '@tanstack/react-query';
import { getArticleDetail } from '../api/getArticleDetail';

export function useArticleDetailQuery(articleId?: number) {
  const isValidId = Number.isFinite(articleId) && articleId! > 0;

  return useQuery({
    queryKey: ['article', articleId],
    queryFn: () => getArticleDetail(articleId as number),
    enabled: isValidId,
    staleTime: 1000 * 60 * 5,
  });
}
