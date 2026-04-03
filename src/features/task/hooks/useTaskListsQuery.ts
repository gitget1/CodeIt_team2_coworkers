import { useQuery } from '@tanstack/react-query';
import { TASK_QUERY_KEYS } from '../lib/queryKeys';
import { getTaskList } from '../api/getTaskList';

export function useTaskListsQuery(groupId: number) {
  return useQuery({
    queryKey: TASK_QUERY_KEYS.lists(groupId),
    queryFn: () => getTaskList({groupId, taskListId}),
    enabled: Boolean(groupId),
  });
}
