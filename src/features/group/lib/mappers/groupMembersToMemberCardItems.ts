import type { GroupMember } from '../../model/entities/group.model';
import type { ImageAsset, MemberCardItem } from '@/shared/ui/profile';

export function groupMembersToMemberCardItems(members: GroupMember[]): MemberCardItem[] {
  return members.map((m) => ({
    id: String(m.userId),
    name: m.userName,
    email: m.userEmail,
    imageSrc: m.userImage ?? undefined,
  }));
}

export function groupMembersToMemberImagePreview(
  members: GroupMember[],
  maxVisibleCount = 3,
): ImageAsset[] {
  return members
    .slice(0, maxVisibleCount)
    .map((m) => m.userImage)
    .filter((url): url is string => url != null && url.length > 0);
}

