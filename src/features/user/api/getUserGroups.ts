import { clientFetcher } from '@/shared/lib/axios/client-fetcher';
import { toMembership } from '../lib/mappers/user.mapper';
import type { MembershipDto } from '../model/dto/user.dto';
import type { Membership } from '../model/entities/user.model';

export async function getUserGroups(): Promise<Membership[]> {
  const { data } = await clientFetcher.get<MembershipDto[]>(`/user/groups`);
  return data.map(toMembership);
}
