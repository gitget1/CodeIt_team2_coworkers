import { clientFetcher } from '@/shared/lib/axios/client-fetcher';
import { ArticleDetailDto } from '../model/dto/article.dto';
import { ArticleDetail } from '../model/entities/article.model';
import { toArticleDetail } from '../model/mapper/article.mapper';

export async function toggleLikeArticle(articleId: number): Promise<ArticleDetail> {
  const { data } = await clientFetcher.post<ArticleDetailDto>(
    `/articles/${articleId}/like`
  );

  return toArticleDetail(data);
}