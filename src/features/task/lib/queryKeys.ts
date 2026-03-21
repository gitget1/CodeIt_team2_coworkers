import { TaskCommonParams } from '../model/params/task.params';

type TaskListQueryKeyParams = TaskCommonParams & {
  date?: string;
};

export const TASK_QUERY_KEYS = {
  all: ['tasks'] as const,
  lists: (groupId: number) => [...TASK_QUERY_KEYS.all, groupId, 'list'] as const,
  list: (params: TaskListQueryKeyParams) =>
    [...TASK_QUERY_KEYS.lists(params.groupId), params.taskListId, params.date] as const,
};
