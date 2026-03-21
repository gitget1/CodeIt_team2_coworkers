export const USER_QUERY_KEYS = {
  all: ['users'] as const,

  me: () => [...USER_QUERY_KEYS.all, 'me'] as const,
};
