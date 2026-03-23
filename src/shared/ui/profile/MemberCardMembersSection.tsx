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
    <>
      <div className={cn('mt-4 space-y-1 pr-1', className)}>
        {visibleMembers.map((member) => (
          <button
            key={member.id}
            type="button"
            onClick={() => onMemberClick(member)}
            className="w-full rounded-xl px-2 py-2 text-left max-lg:transition-colors max-lg:hover:bg-background-secondary"
          >
            <div className="flex items-center justify-between gap-3">
              <MemberChip
                name={member.name}
                email={member.email}
                imageSrc={member.imageSrc}
                isAdmin={member.isAdmin}
              />
              <span className="text-icon-primary" aria-hidden="true">
                ⋮
              </span>
            </div>
          </button>
        ))}
      </div>

      {hasMore && (
        <button
          type="button"
          onClick={onMoreClick}
          className="mt-4 text-sm font-medium text-brand-primary hover:underline"
        >
          더보기 ({members.length - maxVisibleCount})
        </button>
      )}
    </>
  );
}

