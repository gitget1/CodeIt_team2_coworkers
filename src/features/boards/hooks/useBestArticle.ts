import { useEffect, useMemo, useState } from 'react';
import { Article } from '@/features/boards/model/entities/article.model';
import { useResponsive } from './useResponsive';

export function useBestArticles(articles: Article[]) {
  const [current, setCurrent] = useState(0);
  const screen = useResponsive();

  const bestCount = useMemo(() => {
    return screen === 'desktop' ? 3 : screen === 'tablet' ? 2 : 1;
  }, [screen]);
  const maxSlides = 5;
  const total = useMemo(() => {
    return Math.min(Math.ceil(articles.length / bestCount), maxSlides);
  }, [articles.length, bestCount]);

  const visibleBest = useMemo(() => {
    return articles.slice(current * bestCount, current * bestCount + bestCount);
  }, [articles, current, bestCount]);

  useEffect(() => {
    if (total === 0) {
      setCurrent(0);
      return;
    }
    if (current >= total) {
      setCurrent(total - 1);
    }
  }, [current, total]);

  return {
    current,
    total,
    visibleBest,
    setCurrent,
  };
}
