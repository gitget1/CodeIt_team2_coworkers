export const getRedirectQuery = (query: string | string[] | undefined, fallback = '/'): string => {
  if (!query) return fallback;
  return Array.isArray(query) ? query[0] : query;
};
