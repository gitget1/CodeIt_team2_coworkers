import { cn } from '@/shared/lib/cn';
import { MemberChip } from './MemberChip';
import type { MemberCardItem } from './memberCard.types';

type Props = {
  members: MemberCardItem[];
  maxVisibleCount: number;
  onMemberClick: (member: MemberCardItem) => void;
  onMoreClick: () => void;
  className?: string;
};

export function MemberCardMembersSection({
  members,
  maxVisibleCount,
  onMemberClick,
  onMoreClick,
  className,
}: Props) {
  const visibleMembers = members.slice(0, maxVisibleCount);
  const hasMore = members.length > maxVisibleCount;

  return (
    <div
      className={cn(
        'flex flex-col gap-6 overflow-x-hidden',
        className,
      )}
    >
      {visibleMembers.map((member) => (
        <button
          key={member.id}
          type="button"
          onClick={() => onMemberClick(member)}
          className="flex min-h-8 w-full shrink-0 items-center justify-between gap-2 rounded-lg py-0 text-left max-lg:transition-colors max-lg:hover:bg-background-secondary"
        >
          <MemberChip
            name={member.name}
            email={member.email}
            imageSrc={member.imageSrc}
            isAdmin={member.isAdmin}
            size="md"
            className="min-w-0 flex-1"
          />
          <span className="shrink-0 text-icon-primary" aria-hidden="true">
            ⋮
          </span>
        </button>
      ))}

      {hasMore && (
        <button
          type="button"
          onClick={onMoreClick}
          className="shrink-0 text-sm font-medium text-brand-primary hover:underline"
        >
          더보기 ({members.length - maxVisibleCount})
        </button>
      )}
    </div>
  );
}

