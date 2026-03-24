import { clientFetcher } from '@/shared/lib/axios/client-fetcher';
import { toGroupMember } from '../lib/mappers/group.mapper';
import type { GroupMemberDto } from '../model/dto/group.dto';
import type { GroupMember } from '../model/entities/group.model';

export interface GetGroupMemberParams {
  groupId: number;
  memberUserId: number;
}
export async function getGroupMember({
  groupId,
  memberUserId,
}: GetGroupMemberParams): Promise<GroupMember> {
  const { data } = await clientFetcher.get<GroupMemberDto>(
    `/groups/${groupId}/member/${memberUserId}`,
  );
  return toGroupMember(data);
}
