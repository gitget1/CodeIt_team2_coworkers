import { mapTaskErrorToFailure } from './mapTaskErrorToFailure';
import type { Result } from '@/shared/types/result';
import type { TaskDto } from '../model/dto/task.dto';
import type { Task } from '../model/entities/task.model';
import { toTask, toUpdateTaskDto } from '../lib/mappers/task.mapper';
import type { TaskCommonParams } from '../model/params/task.params';
import type { CreateTaskParams } from '../model/params/task.create.params';
import { clientFetcher } from '@/shared/lib/axios/client-fetcher';

type UpdateTaskPath = TaskCommonParams & {
  taskId: number;
};

type UpdateTaskBody = CreateTaskParams;

export async function updateTask(
  path: UpdateTaskPath,
  body: UpdateTaskBody,
): Promise<Result<Task>> {
  const { groupId, taskListId, taskId } = path;

  try {
    const res = await clientFetcher.patch<TaskDto>(
      `/groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}`,
      toUpdateTaskDto(body),
    );

    return { ok: true, data: toTask(res.data) };
  } catch (error: unknown) {
    return mapTaskErrorToFailure(error);
  }
}
