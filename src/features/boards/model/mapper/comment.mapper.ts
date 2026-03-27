import { CommentDto, CommentListDto } from '../dto/comment.dto';
import { Comment, CommentList } from '../entities/comment.model';

export function toComment(dto: CommentDto): Comment {
  return {
    ...dto,
    createdAt: new Date(dto.createdAt),
    updatedAt: new Date(dto.updatedAt),
  };
}

export function toCommentList(dto: CommentListDto): CommentList {
  return {
    nextCursor: dto.nextCursor,
    list: dto.list.map(toComment),
  };
}
