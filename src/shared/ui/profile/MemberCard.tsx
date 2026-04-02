import { useMemo } from 'react';
import { cn } from '@/shared/lib/cn';
import { MemberCardMembersSection } from './MemberCardMembersSection';
import type { MemberCardProps } from './memberCard.types';
import { MemberCardModal } from './MemberCardModal';
import { sortMembersAdminsFirst } from './lib/memberCard.utils';
import { useMemberCardModalState } from './useMemberCardModalState';

export function MemberCard({
  members,
  title = '멤버',
  className,
  maxVisibleCount = 5,
  isMemberRowInteractive,
  onInvite,
  canManageMembers = false,
  currentUserId,
  onRemoveMember,
}: MemberCardProps) {
  const {
    isOpen,
    open,
    modalMode,
    selectedMember,
    memberDetailFromAllList,
    onMemberClick,
    onMemberClickInList,
    onBackToList,
    onMoreClick,
    onModalClose,
  } = useMemberCardModalState({ defaultModeOnClose: 'member' });

  const sortedMembers = useMemo(() => sortMembersAdminsFirst(members), [members]);
  const rowInteractive =
    isMemberRowInteractive === undefined ? true : !!isMemberRowInteractive;

  return (
    <>
      <section
        className={cn(
          'flex w-[240px] flex-col gap-6 overflow-visible rounded-xl border border-background-tertiary bg-background-primary px-5 pt-6 pb-4',
          className,
        )}
      >
        <header className="flex shrink-0 items-center justify-between gap-2">
          <h3 className="min-w-0 truncate text-base font-bold text-txt-primary">
            {title} <span className="text-txt-default">({members.length}명)</span>
          </h3>
          <button
            type="button"
            onClick={onInvite}
            className="shrink-0 text-sm font-semibold text-brand-primary hover:underline"
          >
            초대하기 +
          </button>
        </header>
        <MemberCardMembersSection
          members={sortedMembers}
          maxVisibleCount={maxVisibleCount}
          isInteractive={rowInteractive}
          onMemberClick={onMemberClick}
          onMoreClick={onMoreClick}
          canManageMembers={canManageMembers}
          currentUserId={currentUserId}
          onRemoveMember={onRemoveMember}
        />
      </section>

      <MemberCardModal
        isOpen={isOpen}
        open={open}
        onClose={onModalClose}
        modalMode={modalMode}
        selectedMember={selectedMember}
        members={sortedMembers}
        onMemberClickInList={onMemberClickInList}
        onBackToList={memberDetailFromAllList ? onBackToList : undefined}
      />
    </>
  );
}
