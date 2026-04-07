import { clientFetcher } from '@/shared/lib/axios/client-fetcher';
import { ArticleDetailDto } from '../model/dto/article.dto';
import { ArticleDetail } from '../model/entities/article.model';
import { toArticleDetail } from '../model/mapper/article.mapper';

export async function getArticleDetail(articleId: number): Promise<ArticleDetail> {
  const { data } = await clientFetcher.get<ArticleDetailDto>(`/articles/${articleId}`);

  return toArticleDetail(data);
}
