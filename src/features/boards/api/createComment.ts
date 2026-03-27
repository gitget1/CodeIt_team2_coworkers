import { clientFetcher } from '@/shared/lib/axios/client-fetcher';
import { Comment } from '../model/entities/comment.model';
import { CommentDto } from '../model/dto/comment.dto';
import { toComment } from '../model/mapper/comment.mapper';

type CreateCommentRequest = {
  articleId: number;
  content: string;
};

export async function createComment({
  articleId,
  content,
}: CreateCommentRequest): Promise<Comment> {
  const { data } = await clientFetcher.post<CommentDto>(`/articles/${articleId}/comments`, {
    content,
  });

  return toComment(data);
}
