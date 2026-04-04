import { clientFetcher } from '@/shared/lib/axios/client-fetcher';
import type { TaskCommentDto } from '../model/dto/taskComment.dto';
import { toTaskComment } from '../lib/mappers/taskComment.mapper';
import type { TaskComment } from '../model/entities/taskComment.model';

export async function getTaskComments(taskId: number): Promise<TaskComment[]> {
  const res = await clientFetcher.get<TaskCommentDto[]>(`/tasks/${taskId}/comments`);
  return res.data.map(toTaskComment);
}
