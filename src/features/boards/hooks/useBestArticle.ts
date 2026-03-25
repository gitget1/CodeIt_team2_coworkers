import { useEffect, useState } from 'react';
import { Article } from '@/features/boards/model/entities/article.model';
import { useResponsive } from './useResponsive';

export function useBestArticles(articles: Article[]) {
  const [current, setCurrent] = useState(0);
  const screen = useResponsive();

  const bestCount =
    screen === 'desktop' ? 3 : screen === 'tablet' ? 2 : 1;

  const sortedList = articles
    ?.slice()
    .sort((a, b) => b.likeCount - a.likeCount);

  const total = Math.ceil(sortedList.length / bestCount);

  const visibleBest = sortedList.slice(
    current * bestCount,
    current * bestCount + bestCount
  );

  useEffect(() => {
    if (total === 0) {
      setCurrent(0);
      return;
    }
    if (current >= total) {
      setCurrent(total - 1);
    }
  }, [bestCount, total]);

  return {
    current,
    total,
    visibleBest,
    setCurrent,
  };
}