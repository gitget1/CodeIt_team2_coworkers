import { clientFetcher } from '@/shared/lib/axios/client-fetcher';
import { TaskCommonParams } from '../model/params/task.params';
type Props = TaskCommonParams & {
  date?: string;
};

export async function getTaskListDetail({ groupId, taskListId, date }: Props) {
  const { data } = await clientFetcher.get(`/groups/${groupId}/task-lists/${taskListId}`, {
    params: { date },
  });

  return data;
}
