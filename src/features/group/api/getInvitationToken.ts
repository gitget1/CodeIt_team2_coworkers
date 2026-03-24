import { clientFetcher } from '@/shared/lib/axios/client-fetcher';

// 초대 토큰 발급
export interface GetInvitationTokenParams {
  groupId: number;
}
export async function getInvitationToken({ groupId }: GetInvitationTokenParams): Promise<string> {
  const { data } = await clientFetcher.get<string>(`/groups/${groupId}/invitation`);
  return data;
}
