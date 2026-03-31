import { ArticleForm } from '@/features/boards/components/ArticleForm';
import { useArticleDetailQuery } from '@/features/boards/hooks/useArticleDetailQuery';
import { useRouter } from 'next/router';

export default function EditArticle() {
  const router = useRouter();
  const { articleId } = router.query;

  const id = typeof articleId === 'string' ? Number(articleId) : NaN;

  const { data: article } = useArticleDetailQuery(id);
  if (!article) return null;
  const initialImages = article?.image ? [{ type: 'url' as const, url: article.image }] : [];
  return (
    <div>
      <ArticleForm
        initialTitle={article?.title}
        initialContent={article?.content}
        initialImages={initialImages}
        onSubmit={(data) => {
          console.log('edit', data);
        }}
        mode="edit"
      />
    </div>
  );
}
