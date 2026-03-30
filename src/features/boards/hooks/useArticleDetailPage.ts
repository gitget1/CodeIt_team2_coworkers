import { useRouter } from 'next/router';
import { useArticleDetailQuery } from '@/features/boards/hooks/useArticleDetailQuery';
import { useCommentList } from '@/features/boards/hooks/useCommentList';

export function useArticleDetailPage() {
  const router = useRouter();
  const { articleId } = router.query;

  const id = typeof articleId === 'string' ? Number(articleId) : NaN;

  const { data: article, isLoading, isError } = useArticleDetailQuery(id);

  const { comments } = useCommentList(id);

  return {
    article,
    comments,
    isLoading,
    isError,
  };
}
