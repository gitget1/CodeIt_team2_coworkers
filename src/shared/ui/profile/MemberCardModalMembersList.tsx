import { MemberChip } from './MemberChip';
import { cn } from '@/shared/lib/cn';
import type { MemberCardItem } from './memberCard.types';

type Props = {
  members: MemberCardItem[];
  /** 전달 시 행 클릭으로 멤버 상세로 이동 */
  onMemberClick?: (member: MemberCardItem) => void;
};

export function MemberCardModalMembersList({ members, onMemberClick }: Props) {
  return (
    <div className="min-w-0 space-y-6">
      {members.map((member) =>
        onMemberClick ? (
          <button
            key={member.id}
            type="button"
            onClick={() => onMemberClick(member)}
            className={cn(
              'flex w-full min-w-0 rounded-lg py-1 text-left transition-colors',
              'hover:bg-background-secondary focus-visible:ring-brand-primary focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
            )}
            aria-label={`${member.name} 멤버 상세 보기`}
          >
            <MemberChip
              name={member.name}
              email={member.email}
              imageSrc={member.imageSrc}
              isAdmin={member.isAdmin}
              className="min-w-0 flex-1"
            />
          </button>
        ) : (
          <MemberChip
            key={member.id}
            name={member.name}
            email={member.email}
            imageSrc={member.imageSrc}
            isAdmin={member.isAdmin}
          />
        ),
      )}
    </div>
  );
}

