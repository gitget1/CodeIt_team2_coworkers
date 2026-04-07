import { useQuery } from '@tanstack/react-query';
import { getTaskList } from '../api/getTaskList';
import { TASK_QUERY_KEYS } from '../lib/queryKeys';
import type { TaskCommonParams } from '../model/params/task.params';
import { GetTaskListQuery } from '../model/dto/task.query';

export function useTaskListQuery(path: TaskCommonParams, query?: GetTaskListQuery) {
  const { groupId, taskListId } = path;

  return useQuery({
    queryKey: TASK_QUERY_KEYS.list({
      groupId: path.groupId,
      taskListId: path.taskListId,
      date: query?.date,
    }),
    queryFn: () => getTaskList(path, query),
    enabled: Boolean(groupId && taskListId),
  });
}
