import { mapTaskErrorToFailure } from './mapTaskErrorToFailure';
import type { Result } from '@/shared/types/result';
import type { TaskCommonParams } from '../model/params/task.params';
import { clientFetcher } from '@/shared/lib/axios/client-fetcher';
import { RecurrenceDto } from '../model/dto/recurrence.dto';
import { toRecurrence } from '../lib/mappers/recurrence.mapper';
import { Recurrence } from '../model/entities/recurrence.model';
import { RecurrenceType } from '../model/types/recurrence.type';

type UpdateRecurringPath = TaskCommonParams & {
  recurringId: number;
};

type UpdateRecurringBody = {
  name?: string;
  description?: string;
  startDate?: Date;
  frequencyType?: RecurrenceType;
  monthDay?: number;
  weekDays?: number[];
};

export async function updateRecurring(
  path: UpdateRecurringPath,
  body: UpdateRecurringBody,
): Promise<Result<Recurrence>> {
  const { groupId, taskListId, recurringId } = path;

  try {
    const res = await clientFetcher.patch<RecurrenceDto>(
      `/groups/${groupId}/task-lists/${taskListId}/recurring/${recurringId}`,
      { ...body, startDate: body.startDate?.toISOString() },
    );

    return { ok: true, data: toRecurrence(res.data) };
  } catch (error: unknown) {
    return mapTaskErrorToFailure(error);
  }
}
