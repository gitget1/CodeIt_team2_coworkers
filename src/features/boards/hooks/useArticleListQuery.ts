import { useQuery } from "@tanstack/react-query";
import { getArticleList } from "../api/getArticleList";

export const ARTICLE_QUERY_KEYS = {
  all: ['articles'] as const,
};

export function useArticleListQuery() {
  return useQuery({
    queryKey: ARTICLE_QUERY_KEYS.all,
    queryFn: getArticleList,
  });
}