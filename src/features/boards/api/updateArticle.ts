import { clientFetcher } from '@/shared/lib/axios/client-fetcher';
import { ArticleDto } from '../model/dto/article.dto';
import { toArticle } from '../model/mapper/article.mapper';
import { Article } from '../model/entities/article.model';

type UpdateArticleRequest = {
  articleId: number;
  title: string;
  content: string;
  image?: string;
};

export async function updateArticle({
  articleId,
  title,
  content,
  image,
}: UpdateArticleRequest): Promise<Article> {
  const { data } = await clientFetcher.patch<ArticleDto>(`/articles/${articleId}`, {
    title,
    content,
    image,
  });

  return toArticle(data);
}
