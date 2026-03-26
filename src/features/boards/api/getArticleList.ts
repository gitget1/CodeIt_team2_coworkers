import { clientFetcher } from '@/shared/lib/axios/client-fetcher';
import { ArticleListDto } from '../model/dto/article.dto';
import { ArticleList } from '../model/entities/article.model';
import { toArticleList } from '../model/mapper/article.mapper';

type GetArticleListParams = {
  orderBy?: 'recent' | 'like';
  keyword?: string;
};

export async function getArticleList(params?: GetArticleListParams): Promise<ArticleList> {
  const { data } = await clientFetcher.get<ArticleListDto>(`/articles`, {
    params,
  });

  return toArticleList(data);
}