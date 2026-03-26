import { ArticleList } from '@/features/boards/components/ArticleList';
import { BestArticleCarousel } from '@/features/boards/components/BestArticleCarousel';
import { BoardHeader } from '@/features/boards/components/BoardHeader';
import { BoardToolbar } from '@/features/boards/components/BoardToolbar';
import { useBoardsPage } from '@/features/boards/hooks/useBoardsPage';

export default function BoardsListPage() {
  const {
    best,
    filteredList,
    search,
    setSearch,
    sortOption,
    setSortOption,
    handlers,
    isLoading,
    error,
  } = useBoardsPage();

  return (
    <main className="mx-auto mt-22 max-w-[1120px] px-2 md:px-4 lg:px-0">
      <BoardHeader search={search} onChangeSearch={setSearch} />

      <section className="mt-8 h-92.5 rounded-xl border border-slate-100 bg-slate-100 px-2 pt-10">
        {isLoading ? (
          <div className="flex h-full items-center justify-center">로딩 중...</div>
        ) : error ? (
          <div className="flex h-full items-center justify-center">
            데이터를 가져오는 중 오류 발생
          </div>
        ) : (
          <BestArticleCarousel
            best={best}
            onPrev={handlers.onPrev}
            onNext={handlers.onNext}
            onSwipe={handlers.onSwipe}
          />
        )}
      </section>

      <section className="mt-11 flex justify-center">
        <BoardToolbar sortOption={sortOption} onChangeSort={setSortOption} />
      </section>

      <section className="mt-5 mb-8 flex justify-center">
        {isLoading ? (
          <div className="flex h-20 w-full items-center justify-center">게시글 로딩 중...</div>
        ) : error ? (
          <div className="flex h-20 w-full items-center justify-center">
            게시글을 가져오는 중 오류 발생
          </div>
        ) : (
          <ArticleList articles={filteredList} />
        )}
      </section>
    </main>
  );
}
