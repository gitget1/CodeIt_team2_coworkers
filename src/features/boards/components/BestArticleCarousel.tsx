import { ArticleCard } from '@/features/boards/components/ArticleCard';
import { IconArrowLeft } from '@/shared/ui/icons/IconArrowLeft';
import { IconArrowRight } from '@/shared/ui/icons/IconArrowRight';
import { Article } from '@/features/boards/model/entities/article.model';
import { useState } from 'react';

type BestArticleCarouselProps = {
  best: {
    visibleBest: Article[];
    current: number;
    total: number;
    setCurrent: React.Dispatch<React.SetStateAction<number>>;
  };
  onPrev: () => void;
  onNext: () => void;
  onSwipe: (diff: number) => void;
};

export function BestArticleCarousel({ best, onPrev, onNext, onSwipe }: BestArticleCarouselProps) {
  const [startX, setStartX] = useState<number | null>(null);

  const handleMouseDown = (e: React.MouseEvent) => setStartX(e.clientX);
  const handleMouseUp = (e: React.MouseEvent) => {
    if (startX !== null) {
      onSwipe(e.clientX - startX);
      setStartX(null);
    }
  };

  return (
    <div onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} className="mx-auto">
      <h2 className="px-4 text-xl font-bold md:px-2 lg:px-6">베스트 게시글</h2>
      <div className="flex justify-center gap-4 pt-6">
        {best.visibleBest.map((article) => (
          <ArticleCard key={article.id} article={article} variant="best" />
        ))}
      </div>

      <div className="mt-5 grid grid-cols-3 items-center">
        <div />
        <div className="flex justify-center gap-2">
          {Array.from({ length: best.total }).map((_, i) => (
            <span
              key={i}
              className={`h-2 w-2 rounded-full ${best.current === i ? 'w-4 bg-slate-400' : 'bg-slate-300'}`}
            />
          ))}
        </div>
        <div className="flex justify-end gap-2 pr-6">
          <button
            className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 bg-white"
            onClick={onPrev}
          >
            <IconArrowLeft size={16} />
          </button>
          <button
            className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 bg-white"
            onClick={onNext}
          >
            <IconArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
