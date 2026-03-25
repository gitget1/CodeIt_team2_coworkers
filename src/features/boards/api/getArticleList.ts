import { clientFetcher } from '@/shared/lib/axios/client-fetcher';
import { ArticleListDto } from '../model/dto/article.dto';
import { ArticleList } from '../model/entities/article.model';
import { toArticleList } from '../model/mapper/article.mapper';

export async function getArticleList(): Promise<ArticleList> {
  const { data } = await clientFetcher.get<ArticleListDto>(`/articles`);
  return toArticleList(data);
}
