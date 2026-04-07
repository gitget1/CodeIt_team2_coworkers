import { clientFetcher } from '@/shared/lib/axios/client-fetcher';
import { toGroup } from '../lib/mappers/group.mapper';
import type { PatchGroupRequest, GroupDto } from '../model/dto/group.dto';
import type { Group } from '../model/entities/group.model';

// 그룹 수정
export interface PatchGroupParams {
  groupId: number;
  body: PatchGroupRequest;
}
export async function patchGroup({ groupId, body }: PatchGroupParams): Promise<Group> {
  const { data } = await clientFetcher.patch<GroupDto>(`/groups/${groupId}`, body);
  return toGroup(data);
}
