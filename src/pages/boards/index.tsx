import { ArticleCard } from '@/features/boards/components/ArticleCard';
import ArticleDropDown from '@/features/boards/components/ArticleDropDown';
import { useArticleListQuery } from '@/features/boards/hooks/useArticleListQuery';
import { useBestArticles } from '@/features/boards/hooks/useBestArticle';
import { Article } from '@/features/boards/model/entities/article.model';
import { IconArrowLeft } from '@/shared/ui/icons/IconArrowLeft';
import { IconArrowRight } from '@/shared/ui/icons/IconArrowRight';
import { IconPencil } from '@/shared/ui/icons/IconPencil';
import { IconSearch } from '@/shared/ui/icons/IconSearch';
import { useState } from 'react';

export default function BoardsListPage() {
  const { data, isLoading, error } = useArticleListQuery();
  const mappedList: Article[] = data?.list || [];

  const [sortOption, setSortOption] = useState('최신순');

  const best = useBestArticles(mappedList);

  const handleUpCurrent = () => {
    if (best.current >= best.total - 1) return;
    best.setCurrent((prev) => prev + 1);
  };

  const handleDownCurrent = () => {
    if (best.total === 0) return;
    if (best.current <= 0) return;
    best.setCurrent((prev) => prev - 1);
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>데이터를 가져오는 중 오류 발생</div>;

  return (
    <main className="mx-auto mt-22 max-w-[1120px] px-2 md:px-4 lg:px-0">
      <header className="md:flex md:h-14 md:items-center md:justify-between">
        <h1 className="text-2xl font-bold">자유게시판</h1>

        <label className="mt-3 flex h-12 w-full items-center rounded-full border-2 border-blue-500 md:mt-0 md:h-14 md:w-105">
          <IconSearch size={32} className="ml-3 text-blue-400" />
          <input
            placeholder="검색어를 입력해주세요"
            className="ml-3 w-full text-base outline-none"
          />
        </label>
      </header>
      <section className="mt-8 h-92.5 rounded-xl border border-slate-100 bg-slate-100 px-2 pt-10">
        <div className="mx-auto w-fit">
          <h2 className="text-xl font-bold">베스트 게시글</h2>

          <div className="flex justify-center gap-4 pt-6">
            {best.visibleBest.map((article) => (
              <div key={article.id}>
                <ArticleCard article={article} variant="best" />
              </div>
            ))}
          </div>
          <div className="mt-5 grid grid-cols-3 items-center">
            <div />
            <div className="flex justify-center gap-2">
              {Array.from({ length: best.total }).map((_, i) => (
                <span
                  key={i}
                  className={`h-2 w-2 rounded-full ${
                    best.current === i ? 'w-4 bg-slate-400' : 'bg-slate-300'
                  }`}
                />
              ))}
            </div>
            <div className="flex justify-end gap-2 pr-6">
              <button
                className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 bg-white"
                onClick={handleDownCurrent}
              >
                <IconArrowLeft size={16} />
              </button>
              <button
                className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 bg-white"
                onClick={handleUpCurrent}
              >
                <IconArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="mt-11 flex justify-center">
        <div className="flex w-full max-w-[1074px] justify-between">
          <ArticleDropDown value={sortOption} onChange={setSortOption} />
          <button className="flex h-14 w-14 items-center justify-center rounded-full border border-blue-500 bg-blue-500">
            <IconPencil size={24} className="text-white" />
          </button>
        </div>
      </section>
      <section className="mt-5 mb-8 flex justify-center">
        <div className="grid w-full max-w-[1074px] grid-cols-1 gap-3 lg:grid-cols-2">
          {mappedList.map((article) => (
            <div key={article.id}>
              <ArticleCard article={article} variant="default" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
