import { useEffect, useMemo, useState } from 'react';
import { useArticleListQuery } from '@/features/boards/hooks/useArticleListQuery';
import { useBestArticles } from '@/features/boards/hooks/useBestArticle';
import { debounce } from '../utils/debounce';

export function useBoardsPage() {
  const { data: allData, isLoading, error } = useArticleListQuery({ orderBy: 'recent' });
  const allList = allData?.list || [];
  const best = useBestArticles(allList);

  const [search, setSearch] = useState('');
  const [sortOption, setSortOption] = useState<'recent' | 'like'>('recent');
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  const debouncedSetSearch = useMemo(
    () => debounce((value: string) => setDebouncedSearch(value), 300),
    [],
  );

  useEffect(() => {
    debouncedSetSearch(search);
    return () => debouncedSetSearch.cancel();
  }, [search, debouncedSetSearch]);

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
