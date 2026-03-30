import ArticleContent from '@/features/boards/components/ArticleContent';
import ArticleDetailSkeleton from '@/features/boards/components/ArticleDetailSkeleton';
import CommentSection from '@/features/boards/components/CommentSection';
import { useArticleDetailQuery } from '@/features/boards/hooks/useArticleDetailQuery';
import { useCommentList } from '@/features/boards/hooks/useCommentList';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function ArticleDetail() {
  const router = useRouter();
  const { articleId } = router.query;
  const id = typeof articleId === 'string' ? Number(articleId) : NaN;

  const { data: article, isLoading, isError } = useArticleDetailQuery(id);
  const { comments } = useCommentList(id);

  return (
    <div className="flex justify-center bg-slate-100 p-6">
      <div className="mx-auto w-full max-w-225 space-y-4 rounded-[20px] border border-white bg-white p-4 px-15 py-15">
        <Link href={"/boards"} className="text-slate-400">자유게시판으로 </Link>
        {isLoading ? (
          <ArticleDetailSkeleton />
        ) : isError ? (
          <div className="flex h-40 items-center justify-center text-red-400">에러 발생</div>
        ) : article ? (
          <>
            <ArticleContent article={article} />
            <CommentSection article={article} comments={comments} />
          </>
        ) : null}
      </div>
    </div>
  );
}
