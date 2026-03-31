import { mapTaskErrorToFailure } from './mapTaskErrorToFailure';
import type { Result } from '@/shared/types/result';
import type { TaskDto } from '../model/dto/task.dto';
import { toUpdateTask } from '../lib/mappers/task.mapper';
import type { TaskCommonParams } from '../model/params/task.params';
import { clientFetcher } from '@/shared/lib/axios/client-fetcher';

type UpdateTaskPath = TaskCommonParams & {
  taskId: number;
};

type UpdateTaskBody = {
  name?: string;
  description?: string;
  done?: boolean;
};

export async function updateTask(
  path: UpdateTaskPath,
  body: UpdateTaskBody,
): Promise<Result<void>> {
  const { groupId, taskListId, taskId } = path;

  try {
    const res = await clientFetcher.patch<TaskDto>(
      `/groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}`,
      toUpdateTask(body),
    );

    return { ok: true, data: undefined };
  } catch (error: unknown) {
    return mapTaskErrorToFailure(error);
  }
}
