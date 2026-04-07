import { clientFetcher } from '@/shared/lib/axios/client-fetcher';
import { toUserProfile } from '../lib/mappers/user.mapper';
import type { GetUserResponse } from '../model/dto/user.dto';
import type { UserProfile } from '../model/entities/user.model';

export async function getUser(): Promise<UserProfile> {
  const { data } = await clientFetcher.get<GetUserResponse>(`/user`, {
    skipAuthFailureRedirect: true,
  });
  return toUserProfile(data);
}
