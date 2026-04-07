import { clientFetcher } from '@/shared/lib/axios/client-fetcher';
import { mapTaskErrorToFailure } from './mapTaskErrorToFailure';
import type { Result } from '@/shared/types/result';
import type { TaskCommonParams } from '../model/params/task.params';

type DeleteRecurringPath = TaskCommonParams & {
  taskId: number;
  recurringId: number;
};

export async function deleteRecurring(path: DeleteRecurringPath): Promise<Result<void>> {
  const { groupId, taskListId, taskId, recurringId } = path;
  try {
    await clientFetcher.delete(
      `/groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}/recurring/${recurringId}`,
    );
    return { ok: true, data: undefined };
  } catch (error: unknown) {
    return mapTaskErrorToFailure(error);
  }
}
