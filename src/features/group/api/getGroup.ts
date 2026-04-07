import { clientFetcher } from '@/shared/lib/axios/client-fetcher';
import type { GetGroupDetailResponse } from '../model/dto/group.dto';
import type { GroupDetail } from '../model/entities/group.model';
import { toGroupDetail } from '../lib/mappers/group.mapper';

export interface GetGroupParams {
  groupId: number;
}

export async function getGroup({ groupId }: GetGroupParams): Promise<GroupDetail> {
  const { data } = await clientFetcher.get<GetGroupDetailResponse>(`/groups/${groupId}`);
  return toGroupDetail(data);
}
