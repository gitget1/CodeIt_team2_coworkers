import type { GroupMember } from '../../model/entities/group.model';
import type { MemberCardItem } from '@/shared/ui/profile';

export function groupMembersToMemberCardItems(members: GroupMember[]): MemberCardItem[] {
  return members.map((m) => ({
    id: String(m.userId),
    name: m.userName,
    email: m.userEmail,
    imageSrc: m.userImage ?? undefined,
    isAdmin: m.role === 'ADMIN',
  }));
}
