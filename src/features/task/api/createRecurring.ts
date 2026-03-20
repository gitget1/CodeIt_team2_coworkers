import httpClient from '@/shared/api/httpClient';
import { CreateRecurringParams } from '../model/params/task.create.params';
import { TaskCommonParams } from '../model/params/task.params';
import { Result } from '@/shared/types/result';
import { Task } from '../model/entities/task.model';
import { toTask } from '../lib/mappers/task.mapper';
import { mapTaskErrorToFailure } from './mapTaskErrorToFailure';

export async function createRecurring(
  path: TaskCommonParams,
  body: CreateRecurringParams,
): Promise<Result<Task>> {
  const { teamId, groupId, taskListId } = path;
  try {
    const res = await httpClient.post(
      `/${teamId}/groups${groupId}/task-lists/${taskListId}/recurring`,
      {
        ...body,
        startDate: body.startDate.toISOString(),
      },
    );

    return {
      ok: true,
      data: toTask(res.data),
    };
  } catch (error: unknown) {
    return mapTaskErrorToFailure(error);
  }
}
