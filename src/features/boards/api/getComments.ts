import { clientFetcher } from '@/shared/lib/axios/client-fetcher';
import { CommentListDto } from '../model/dto/comment.dto';
import { toCommentList } from '../model/mapper/comment.mapper';
import { CommentList } from '../model/entities/comment.model';

type GetCommentsParams = {
  articleId: number;
  limit: number;
  cursor?: number;
};

export async function getComments(params: GetCommentsParams): Promise<CommentList> {
  const { data } = await clientFetcher.get<CommentListDto>(
    `/articles/${params.articleId}/comments`,
    {
      params: {
        limit: params.limit,
        cursor: params.cursor,
      },
    },
  );
  return toCommentList(data);
}
