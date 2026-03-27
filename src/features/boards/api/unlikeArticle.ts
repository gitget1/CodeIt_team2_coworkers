import { clientFetcher } from '@/shared/lib/axios/client-fetcher';
import { ArticleDetail } from '../model/entities/article.model';
import { ArticleDetailDto } from '../model/dto/article.dto';
import { toArticleDetail } from '../model/mapper/article.mapper';

export async function unlikeArticle(articleId: number): Promise<ArticleDetail> {
  const { data } = await clientFetcher.delete<ArticleDetailDto>(`/articles/${articleId}/like`);

  return toArticleDetail(data);
}
