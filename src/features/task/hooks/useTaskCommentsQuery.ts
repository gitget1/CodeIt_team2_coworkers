import { useQuery } from '@tanstack/react-query';
import { getTaskComments } from '../api/getTaskComments';
import { TASK_QUERY_KEYS } from '../lib/queryKeys';

type Options = {
  enabled?: boolean;
};

export function useTaskCommentsQuery(taskId: number | undefined, options?: Options) {
  const enabled = Boolean(taskId != null && taskId > 0 && (options?.enabled ?? true));

  return useQuery({
    queryKey: TASK_QUERY_KEYS.comments(taskId ?? 0),
    queryFn: () => getTaskComments(taskId!),
    enabled,
  });
}
