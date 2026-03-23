import { MemberChip } from './MemberChip';
import type { MemberCardItem } from './memberCard.types';

type Props = {
  member: MemberCardItem | null;
};

export function MemberCardModalMember({ member }: Props) {
  if (!member) return null;

  return (
    <MemberChip
      name={member.name}
      email={member.email}
      imageSrc={member.imageSrc}
      isAdmin={member.isAdmin}
    />
  );
}

