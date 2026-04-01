import { ArticleForm } from '@/features/boards/components/ArticleForm';
import { useCreateArticle } from '@/features/boards/hooks/useCreateArticle';
import { handleImages } from '@/features/boards/utils/handleImages';
import { uploadImage } from '@/features/user';

export default function CreateArticle() {
  const { createArticle } = useCreateArticle();

  return (
    <div>
      <ArticleForm
        onSubmit={async ({ title, content, images }) => {
          try {
            const allImages = await handleImages(images);
            const image = allImages[0];

            await createArticle(title, content, image);
          } catch (error) {
            alert('게시글 생성 중 오류가 발생했습니다.');
          }
        }}
      />
    </div>
  );
}
