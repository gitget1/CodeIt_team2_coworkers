import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createArticle } from '../api/createArticle';
import { toast } from 'sonner';
import { ARTICLE_QUERY_KEYS } from '../model/querykeys';
import { useRouter } from 'next/router';

export function useCreateArticle() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createArticle,
  });
  const router = useRouter();
  const createArticleHandler = (title: string, content: string, image?: string) => {
    mutate(
      { title, content, image },
      {
        onSuccess: async () => {
          await router.replace('/boards');

          queryClient.invalidateQueries({
            queryKey: ['articles', 'list'],
          });

          toast.success('게시글이 등록되었습니다.');
        },
      },
    );
  };

  return {
    createArticle: createArticleHandler,
    isCreating: isPending,
  };
}
