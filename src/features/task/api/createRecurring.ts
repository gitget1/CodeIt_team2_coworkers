import { CreateRecurringParams } from '../model/params/task.create.params';
import { TaskCommonParams } from '../model/params/task.params';
import { Result } from '@/shared/types/result';
import { Task } from '../model/entities/task.model';
import type { TaskDto } from '../model/dto/task.dto';
import { toTask } from '../lib/mappers/task.mapper';
import { mapTaskErrorToFailure } from './mapTaskErrorToFailure';
import { clientFetcher } from '@/shared/lib/axios/client-fetcher';

export async function createRecurring(
  path: TaskCommonParams,
  body: CreateRecurringParams,
): Promise<Result<Task>> {
  const { groupId, taskListId } = path;
  try {
    const res = await clientFetcher.post<TaskDto>(
      `/groups/${groupId}/task-lists/${taskListId}/recurring`,
      {
        ...body,
        startDate: body.startDate.toISOString(),
      },
    );

    return {
      ok: true,
      data: toTask(res.data, taskListId),
    };
  } catch (error: unknown) {
    return mapTaskErrorToFailure(error);
  }
}
