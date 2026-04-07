import { clientFetcher } from '@/shared/lib/axios/client-fetcher';
import type { PostGroupRequest, PostGroupResponse } from '../model/dto/group.dto';
import type { Group } from '../model/entities/group.model';
import { toGroup } from '../lib/mappers/group.mapper';

export interface CreateGroupParams {
  body: PostGroupRequest;
}

export async function createGroup({ body }: CreateGroupParams): Promise<Group> {
  const { data } = await clientFetcher.post<PostGroupResponse>(`/groups`, body);

  return toGroup(data);
}
