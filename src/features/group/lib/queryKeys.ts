export const GROUP_QUERY_KEYS = {
  all: ['groups'] as const,
  details: () => [...GROUP_QUERY_KEYS.all, 'detail'] as const,
  detail: (groupId: number) => [...GROUP_QUERY_KEYS.details(), groupId] as const,
  members: (groupId: number) => [...GROUP_QUERY_KEYS.detail(groupId), 'members'] as const,
  member: (groupId: number, userId: number) =>
    [...GROUP_QUERY_KEYS.members(groupId), userId] as const,
  tasks: (groupId: number, date?: string) =>
    [...GROUP_QUERY_KEYS.detail(groupId), 'tasks', date] as const,
};
