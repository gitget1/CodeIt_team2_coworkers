import { clientFetcher } from '@/shared/lib/axios/client-fetcher';
import type { UserDto, PatchUserRequest } from '../model/dto/user.dto';

export async function updateUser(params: PatchUserRequest): Promise<{ message: string }> {
  const { data } = await clientFetcher.patch<{ message: string }>(`/user`, params);

  return data;
}
