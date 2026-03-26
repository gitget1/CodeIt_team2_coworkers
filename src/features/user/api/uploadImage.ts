import { clientFetcher } from '@/shared/lib/axios/client-fetcher';

export async function uploadImage(file: File): Promise<{ url: string }> {
  const formData = new FormData();
  formData.append('image', file);

  const { data } = await clientFetcher.post<{ url: string }>(`/images/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
}
