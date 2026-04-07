import { ArticleForm } from '@/features/boards/components/ArticleForm';
import { useArticleDetailQuery } from '@/features/boards/hooks/useArticleDetailQuery';
import { useUpdateArticle } from '@/features/boards/hooks/useUpdateArticle';
import { handleImages } from '@/features/boards/utils/handleImages';
import { GlobalLayout } from '@/widgets/layout/GlobalLayout';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';

export default function EditArticle() {
  const router = useRouter();
  const { articleId } = router.query;

  const id = typeof articleId === 'string' ? Number(articleId) : NaN;
  const { updateArticle } = useUpdateArticle();
  const { data: article } = useArticleDetailQuery(id);
  if (!article) return null;
  const initialImages = article?.image ? [{ type: 'url' as const, url: article.image }] : [];
  return (
    <div>
      <ArticleForm
        initialTitle={article?.title}
        initialContent={article?.content}
        initialImages={initialImages}
        onSubmit={async ({ title, content, images }) => {
          try {
            const allImages = await handleImages(images);
            const image = allImages[0];

            await updateArticle(article.id, title, content, image);
          } catch (error) {
            alert('게시글 수정 중 오류가 발생했습니다.');
          }
        }}
        mode="edit"
      />
    </div>
  );
}
EditArticle.getLayout = function getLayout(page: ReactElement) {
  return <GlobalLayout>{page}</GlobalLayout>;
};
