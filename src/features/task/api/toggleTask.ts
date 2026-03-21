import { TaskCommonParams } from '../model/params/task.params';
import { clientFetcher } from '@/shared/lib/axios/client-fetcher';

type ToggleTaskParams = TaskCommonParams & {
  taskId: number;
  done: boolean;
};
export async function toggleTask({ groupId, taskListId, taskId, done }: ToggleTaskParams) {
  const res = await clientFetcher.patch(
    `/groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}`,
    {
      done,
    },
  );
  return res.data;
}
