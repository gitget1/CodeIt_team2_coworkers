export const GROUP_QUERY_KEYS = {
  all: ['groups'] as const,
  details: () => [...GROUP_QUERY_KEYS.all, 'detail'] as const,
  detail: (groupId: number) => [...GROUP_QUERY_KEYS.details(), groupId] as const,
};
