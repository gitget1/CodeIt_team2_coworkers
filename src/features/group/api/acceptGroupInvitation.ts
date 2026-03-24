import { clientFetcher } from '@/shared/lib/axios/client-fetcher';
import type { AcceptInvitationRequest } from '../model/dto/group.dto';

export interface AcceptGroupInvitationParams {
  body: AcceptInvitationRequest;
}
export async function acceptGroupInvitation({
  body,
}: AcceptGroupInvitationParams): Promise<{ groupId: number }> {
  const { data } = await clientFetcher.post<{ groupId: number }>(`/groups/accept-invitation`, body);
  return data;
}
