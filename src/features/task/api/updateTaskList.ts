import { clientFetcher } from '@/shared/lib/axios/client-fetcher';
import type { Result } from '@/shared/types/result';
import type { TaskListDto } from '../model/dto/task.dto';
import { mapTaskErrorToFailure } from './mapTaskErrorToFailure';

type UpdateTaskListPath = {
  groupId: number;
  taskListId: string;
};

type UpdateTaskListBody = {
  name?: string;
};

export async function updateTaskList(
  path: UpdateTaskListPath,
  body: UpdateTaskListBody,
): Promise<Result<TaskListDto>> {
  const { groupId, taskListId } = path;
  try {
    const res = await clientFetcher.patch<TaskListDto>(
      `/groups/${groupId}/task-lists/${taskListId}`,
      body,
    );
    return { ok: true, data: res.data };
  } catch (error: unknown) {
    return mapTaskErrorToFailure(error);
  }
}
