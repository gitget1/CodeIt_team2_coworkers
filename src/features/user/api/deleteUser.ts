import { clientFetcher } from '@/shared/lib/axios/client-fetcher';

export async function deleteUser(): Promise<void> {
  await clientFetcher.delete(`/user`);
}
