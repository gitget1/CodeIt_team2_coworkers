export const ARTICLE_QUERY_KEYS = {
  all: ['articles'] as const,

  list: (params?: { orderBy?: string; keyword?: string; pageSize?: number }) =>
    [...ARTICLE_QUERY_KEYS.all, 'list', params] as const,

  detail: (articleId: number) => [...ARTICLE_QUERY_KEYS.all, 'detail', articleId] as const,

  comments: (articleId: number) => [...ARTICLE_QUERY_KEYS.all, 'comments', articleId] as const,
};
