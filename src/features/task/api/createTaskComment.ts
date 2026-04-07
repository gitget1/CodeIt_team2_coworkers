import { clientFetcher } from '@/shared/lib/axios/client-fetcher';
import type { CreateTaskCommentBodyDto, TaskCommentDto } from '../model/dto/taskComment.dto';
import { toTaskComment } from '../lib/mappers/taskComment.mapper';
import type { TaskComment } from '../model/entities/taskComment.model';

export async function createTaskComment(
  taskId: number,
  body: CreateTaskCommentBodyDto,
): Promise<TaskComment> {
  const res = await clientFetcher.post<TaskCommentDto>(`/tasks/${taskId}/comments`, body);
  return toTaskComment(res.data);
}
