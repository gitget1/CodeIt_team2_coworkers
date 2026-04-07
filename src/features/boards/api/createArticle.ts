import { clientFetcher } from '@/shared/lib/axios/client-fetcher';
import { ArticleDto } from '../model/dto/article.dto';
import { toArticle } from '../model/mapper/article.mapper';

type CreateArticleRequest = {
  title: string;
  content: string;
  image?: string;
};

export async function createArticle({ title, content, image }: CreateArticleRequest) {
  const { data } = await clientFetcher.post<ArticleDto>(`/articles`, {
    title,
    content,
    image,
  });

  return toArticle(data);
}
