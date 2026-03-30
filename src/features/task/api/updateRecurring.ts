import { mapTaskErrorToFailure } from './mapTaskErrorToFailure';
import type { Result } from '@/shared/types/result';
import type { TaskCommonParams } from '../model/params/task.params';
import type { CreateRecurringParams } from '../model/params/task.create.params';
import { clientFetcher } from '@/shared/lib/axios/client-fetcher';
import { RecurrenceDto } from '../model/dto/recurrence.dto';
import { toRecurrence } from '../lib/mappers/recurrence.mapper';
import { toUpdateRecurringDto } from '../lib/mappers/task.mapper';
import { Recurrence } from '../model/entities/recurrence.model';

type UpdateRecurringPath = TaskCommonParams & {
  recurringId: number;
};

type UpdateRecurringBody = CreateRecurringParams;

export async function updateRecurring(
  path: UpdateRecurringPath,
  body: UpdateRecurringBody,
): Promise<Result<Recurrence>> {
  const { groupId, taskListId, recurringId } = path;

  try {
    const res = await clientFetcher.patch<RecurrenceDto>(
      `/groups/${groupId}/task-lists/${taskListId}/recurring/${recurringId}`,
      toUpdateRecurringDto(body),
    );

    return { ok: true, data: toRecurrence(res.data) };
  } catch (error: unknown) {
    return mapTaskErrorToFailure(error);
  }
}
