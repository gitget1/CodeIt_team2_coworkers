import { useQuery } from '@tanstack/react-query';
import { getGroupTasks } from '../api/getGroupTasks';
import { GROUP_QUERY_KEYS } from '../lib/queryKeys';
import type { ApiError } from '@/shared/types/apiError';
import type { Task } from '@/features/task/model/entities/task.model';

// 할 일 목록 조회
export function useGroupTasksQuery(groupId: number, date?: string) {
  return useQuery<Task[], ApiError>({
    queryKey: GROUP_QUERY_KEYS.tasks(groupId, date),
    queryFn: () => getGroupTasks({ groupId, date }),
    enabled: !!groupId,
  });
}
