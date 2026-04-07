import { clientFetcher } from '@/shared/lib/axios/client-fetcher';
import type { TaskCommentDto, UpdateTaskCommentBodyDto } from '../model/dto/taskComment.dto';
import { toTaskComment } from '../lib/mappers/taskComment.mapper';
import type { TaskComment } from '../model/entities/taskComment.model';

export async function updateTaskComment(
  taskId: number,
  commentId: number,
  body: UpdateTaskCommentBodyDto,
): Promise<TaskComment> {
  const res = await clientFetcher.patch<TaskCommentDto>(
    `/tasks/${taskId}/comments/${commentId}`,
    body,
  );
  return toTaskComment(res.data);
}
