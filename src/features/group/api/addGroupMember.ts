import { clientFetcher } from '@/shared/lib/axios/client-fetcher';
import type { AddMemberRequest } from '../model/dto/group.dto';

// 멤버 추가
export interface AddGroupMemberParams {
  groupId: number;
  body: AddMemberRequest;
}
export async function addGroupMember({ groupId, body }: AddGroupMemberParams): Promise<void> {
  await clientFetcher.post(`/groups/${groupId}/member`, body);
}
