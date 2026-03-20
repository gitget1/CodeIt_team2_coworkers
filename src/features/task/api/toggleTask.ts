import httpClient from '@/shared/api/httpClient';
import { TaskCommonParams } from '../model/params/task.params';

type ToggleTaskParams = TaskCommonParams & {
  taskId: number;
  name: string;
  description?: string;
  done: boolean;
};
export async function toggleTask({
  teamId,
  groupId,
  taskListId,
  taskId,
  name,
  description,
  done,
}: ToggleTaskParams) {
  const res = await httpClient.patch(
    `/${teamId}/groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}`,
    {
      name,
      description,
      done,
    },
  );
  return res.data;
}
