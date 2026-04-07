import { clientFetcher } from '@/shared/lib/axios/client-fetcher';
import { CommentDto } from '../model/dto/comment.dto';
import { Comment } from '../model/entities/comment.model';
import { toComment } from '../model/mapper/comment.mapper';

type UpdateCommentRequest = {
  commentId: number;
  content: string;
};

export async function updateComment({
  commentId,
  content,
}: UpdateCommentRequest): Promise<Comment> {
  const { data } = await clientFetcher.patch<CommentDto>(`/comments/${commentId}`, { content });

  return toComment(data);
}
