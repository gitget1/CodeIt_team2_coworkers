import { clientFetcher } from '@/shared/lib/axios/client-fetcher';
import { TaskCommonParams } from '../model/params/task.params';
import { Result } from '@/shared/types/result';
import { mapTaskErrorToFailure } from './mapTaskErrorToFailure';

export async function deleteTask(
  path: TaskCommonParams & { taskId: number },
): Promise<Result<void>> {
  const { groupId, taskListId, taskId } = path;

  try {
    await clientFetcher.delete(`/groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}`);

    return { ok: true, data: undefined };
  } catch (error: unknown) {
    return mapTaskErrorToFailure(error);
  }
}
