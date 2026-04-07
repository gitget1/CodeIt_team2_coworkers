import { clientFetcher } from '@/shared/lib/axios/client-fetcher';

type DeleteCommentResponse = {
  id: number;
};

export async function deleteComment(commentId: number): Promise<number> {
  const { data } = await clientFetcher.delete<DeleteCommentResponse>(`/comments/${commentId}`);

  return data.id;
}
