import { cn } from '@/shared/lib/cn';
import { IconKebab } from '@/shared/ui/icons';
import { MemberChip } from './MemberChip';
import type { MemberCardItem } from './memberCard.types';

type Props = {
  members: MemberCardItem[];
  maxVisibleCount: number;
  isInteractive: boolean;
  onMemberClick: (member: MemberCardItem) => void;
  onMoreClick: () => void;
  className?: string;
};

export function MemberCardMembersSection({
  members,
  maxVisibleCount,
  isInteractive,
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
        isInteractive ? (
          <button
            key={member.id}
            type="button"
            onClick={() => onMemberClick(member)}
            aria-label={`${member.name} 멤버 상세 보기`}
            className="flex min-h-8 w-full shrink-0 items-center justify-between gap-2 rounded-lg py-0 text-left transition-colors hover:bg-background-secondary"
          >
            <MemberChip
              name={member.name}
              email={member.email}
              imageSrc={member.imageSrc}
              isAdmin={member.isAdmin}
              size="md"
              className="min-w-0 flex-1"
            />
            <IconKebab size={20} className="shrink-0 text-icon-primary" aria-hidden="true" />
          </button>
        ) : (
          <div
            key={member.id}
            className="flex min-h-8 w-full shrink-0 items-center justify-between gap-2 rounded-lg py-0 text-left cursor-default"
          >
            <MemberChip
              name={member.name}
              email={member.email}
              imageSrc={member.imageSrc}
              isAdmin={member.isAdmin}
              size="md"
              className="min-w-0 flex-1"
            />
            <IconKebab size={20} className="shrink-0 text-icon-primary" aria-hidden="true" />
          </div>
        )
      ))}

      {hasMore && (
        <button
          type="button"
          onClick={onMoreClick}
          className="shrink-0 self-start rounded-lg border border-background-tertiary bg-background-secondary px-3 py-1.5 text-sm font-medium text-brand-primary transition-colors hover:bg-background-tertiary"
        >
          더보기 ({members.length - maxVisibleCount})
        </button>
      )}
    </div>
  );
}

