import { useQuery } from '@tanstack/react-query';
import { getTaskListDetail } from '../api/getTaskListDetail';

export function useTaskListDetailQuery(groupId: number, taskListId: number) {
  return useQuery({
    queryKey: ['taskListDetail', groupId, taskListId],
    queryFn: () => getTaskListDetail({ groupId, taskListId }),
    enabled: !!groupId && !!taskListId,
  });
}
