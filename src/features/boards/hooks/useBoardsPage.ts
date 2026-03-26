import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { useArticleListQuery } from '@/features/boards/hooks/useArticleListQuery';
import { useBestArticles } from '@/features/boards/hooks/useBestArticle';

export function useBoardsPage() {
  const { data: allData, isLoading, error } = useArticleListQuery({ orderBy: 'recent' });
  const allList = allData?.list || [];
  const best = useBestArticles(allList);

  const [search, setSearch] = useState('');
  const [sortOption, setSortOption] = useState<'recent' | 'like'>('recent');
  const [debouncedSearch] = useDebounce(search, 300);

  const { data: filteredData } = useArticleListQuery({
    orderBy: sortOption,
    keyword: debouncedSearch,
  });
  const filteredList = filteredData?.list || [];

  const handlers = {
    onNext: () => {
      if (best.current < best.total - 1) best.setCurrent((prev) => prev + 1);
    },
    onPrev: () => {
      if (best.current > 0) best.setCurrent((prev) => prev - 1);
    },
    onSwipe: (diff: number) => {
      if (diff > 50) handlers.onPrev();
      if (diff < -50) handlers.onNext();
    },
  };

  return {
    best,
    filteredList,
    search,
    setSearch,
    sortOption,
    setSortOption,
    handlers,
    isLoading,
    error,
  };
}
