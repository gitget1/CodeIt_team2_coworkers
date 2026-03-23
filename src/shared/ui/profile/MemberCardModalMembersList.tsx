import { MemberChip } from './MemberChip';
import type { MemberCardItem } from './memberCard.types';

type Props = {
  members: MemberCardItem[];
};

export function MemberCardModalMembersList({ members }: Props) {
  return (
    <div className="space-y-2">
      {members.map((member) => (
        <MemberChip
          key={member.id}
          name={member.name}
          email={member.email}
          imageSrc={member.imageSrc}
          isAdmin={member.isAdmin}
        />
      ))}
    </div>
  );
}

