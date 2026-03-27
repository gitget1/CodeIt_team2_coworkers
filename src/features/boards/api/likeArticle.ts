import { clientFetcher } from '@/shared/lib/axios/client-fetcher';
import { ArticleDetail } from '../model/entities/article.model';
import { toArticleDetail } from '../model/mapper/article.mapper';
import { ArticleDetailDto } from '../model/dto/article.dto';

export async function likeArticle(articleId: number): Promise<ArticleDetail> {
  const { data } = await clientFetcher.post<ArticleDetailDto>(`/articles/${articleId}/like`);

  return toArticleDetail(data);
}
