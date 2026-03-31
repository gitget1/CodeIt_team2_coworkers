import { ArticleForm } from '@/features/boards/components/ArticleForm';

export default function CreateArticle() {
  return (
    <div>
      <ArticleForm
        onSubmit={(data) => {
          console.log('create', data);
        }}
      />
    </div>
  );
}
