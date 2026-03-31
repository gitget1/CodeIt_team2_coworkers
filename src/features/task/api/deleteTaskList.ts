import { clientFetcher } from '@/shared/lib/axios/client-fetcher';
import type { Result } from '@/shared/types/result';
import { mapTaskErrorToFailure } from './mapTaskErrorToFailure';

type DeleteTaskListPath = {
  groupId: number;
  taskListId: string;
};

export async function deleteTaskList(path: DeleteTaskListPath): Promise<Result<void>> {
  const { groupId, taskListId } = path;
  try {
    await clientFetcher.delete(`/groups/${groupId}/task-lists/${taskListId}`);
    return { ok: true, data: undefined };
  } catch (error: unknown) {
    return mapTaskErrorToFailure(error);
  }
}
