import { clientFetcher } from '@/shared/lib/axios/client-fetcher';
import type { UpdatePasswordRequest } from '../model/dto/user.dto';

export async function updatePassword(params: UpdatePasswordRequest): Promise<{ message: string }> {
  const { data } = await clientFetcher.patch<{ message: string }>(`/user/password`, params);
  return data;
}
