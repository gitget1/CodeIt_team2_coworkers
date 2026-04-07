import { clientFetcher } from '@/shared/lib/axios/client-fetcher';
import type { TaskDto } from '@/features/task/model/dto/task.dto';
import { toTask } from '@/features/task/lib/mappers/task.mapper';
import type { Task } from '@/features/task/model/entities/task.model';

// 그룹 할 일 목록 조회
export interface GetGroupTasksParams {
  groupId: number;
  date?: string;
}
export async function getGroupTasks({ groupId, date }: GetGroupTasksParams): Promise<Task[]> {
  const { data } = await clientFetcher.get<TaskDto[]>(`/groups/${groupId}/tasks`, {
    params: { date },
  });

  return data.map(toTask);
}
