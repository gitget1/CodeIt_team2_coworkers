import { clientFetcher } from '@/shared/lib/axios/client-fetcher';
import type { Result } from '@/shared/types/result';
import type { TaskListDto } from '../model/dto/task.dto';
import { mapTaskErrorToFailure } from './mapTaskErrorToFailure';

type CreateTaskListPath = {
  groupId: number;
};

type CreateTaskListBody = {
  name: string;
};

export async function createTaskList(
  path: CreateTaskListPath,
  body: CreateTaskListBody,
): Promise<Result<TaskListDto>> {
  const { groupId } = path;
  try {
    const res = await clientFetcher.post<TaskListDto>(`/groups/${groupId}/task-lists`, body);
    return { ok: true, data: res.data };
  } catch (error: unknown) {
    return mapTaskErrorToFailure(error);
  }
}
