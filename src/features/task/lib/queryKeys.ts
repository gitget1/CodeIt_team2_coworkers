export const TASK_QUERY_KEYS = {
  all: ['tasks'] as const,
  lists: () => [...TASK_QUERY_KEYS.all, 'list'] as const,
  list: (params: { taskListId: number; date?: Date }) =>
    [...TASK_QUERY_KEYS.lists(), params.taskListId, params.date] as const,
};
