import type { TaskCommentDto } from '../../model/dto/taskComment.dto';
import type { TaskComment } from '../../model/entities/taskComment.model';
import { toUser } from './task.mapper';

export function toTaskComment(dto: TaskCommentDto): TaskComment {
  return {
    id: dto.id,
    content: dto.content,
    createdAt: new Date(dto.createdAt),
    updatedAt: new Date(dto.updatedAt),
    taskId: dto.taskId,
    userId: dto.userId ?? dto.user.id,
    user: toUser(dto.user),
  };
}
