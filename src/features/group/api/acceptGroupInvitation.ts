import { clientFetcher } from '@/shared/lib/axios/client-fetcher';
import type { AcceptInvitationRequest, AcceptInvitationResponse } from '../model/dto/group.dto';

export interface AcceptGroupInvitationParams {
  body: AcceptInvitationRequest;
}

export async function acceptGroupInvitation({
  body,
}: AcceptGroupInvitationParams): Promise<AcceptInvitationResponse> {
  const { data } = await clientFetcher.post<AcceptInvitationResponse>(
    '/groups/accept-invitation',
    body,
  );
  return data;
}

