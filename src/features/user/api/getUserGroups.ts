import { clientFetcher } from '@/shared/lib/axios/client-fetcher';
import { toMembershipGroup } from '../lib/mappers/user.mapper';
import type { MembershipGroupDto } from '../model/dto/user.dto';
import type { MembershipGroup } from '../model/entities/user.model';

export async function getUserGroups(): Promise<MembershipGroup[]> {
  const { data } = await clientFetcher.get<MembershipGroupDto[]>(`/user/groups`);
  return data.map(toMembershipGroup);
}
