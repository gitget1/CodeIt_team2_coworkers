import { clientFetcher } from '@/shared/lib/axios/client-fetcher';

export async function deleteArticle(articleId: number): Promise<number> {
  const { data } = await clientFetcher.delete<{ id: number }>(`/articles/${articleId}`);

  return data.id;
}
