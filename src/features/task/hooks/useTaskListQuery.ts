import { useQuery } from '@tanstack/react-query';
import { getTaskList, GetTaskListParams } from '../api/getTaskList';
import { TASK_QUERY_KEYS } from '../lib/queryKeys';

export function useTaskListQuery(params: GetTaskListParams) {
  const { teamId, groupId, taskListId, date } = params;

  return useQuery({
    queryKey: TASK_QUERY_KEYS.list({ taskListId, date }),
    queryFn: () => getTaskList({ teamId, groupId, taskListId, date }),
    enabled: Boolean(teamId && groupId && taskListId),
  });
}
