type TaskListQueryKeyParams = {
  teamId: number;
  groupId: number;
  taskListId: number;
  date?: string;
};

export const TASK_QUERY_KEYS = {
  all: ['tasks'] as const,
  lists: (teamId: number, groupId: number) =>
    [...TASK_QUERY_KEYS.all, teamId, groupId, 'list'] as const,
  list: (params: TaskListQueryKeyParams) =>
    [
      ...TASK_QUERY_KEYS.lists(params.teamId, params.groupId),
      params.taskListId,
      params.date,
    ] as const,
};
