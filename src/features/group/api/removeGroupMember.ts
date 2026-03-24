import { clientFetcher } from '@/shared/lib/axios/client-fetcher';

// 그룹 멤버 제거
export interface RemoveGroupMemberParams {
  groupId: number;
  memberUserId: number;
}
export async function removeGroupMember({
  groupId,
  memberUserId,
}: RemoveGroupMemberParams): Promise<void> {
  await clientFetcher.delete(`/groups/${groupId}/member/${memberUserId}`);
}
