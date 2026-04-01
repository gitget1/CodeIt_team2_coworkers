import { useCallback, useMemo, useState } from 'react';
import { cn } from '@/shared/lib/cn';
import { MemberCardMembersSection } from './MemberCardMembersSection';
import { useModal } from '@/shared/ui/modal';
import type { MemberCardItem, MemberCardModalMode, MemberCardProps } from './memberCard.types';
import { MemberCardModal } from './MemberCardModal';

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
  const [selectedMember, setSelectedMember] = useState<MemberCardItem | null>(null);
  const [modalMode, setModalMode] = useState<MemberCardModalMode>('member');
  /** 「더보기」목록에서 멤버를 골라 상세로 들어간 경우 — 뒤로가기 표시 */
  const [memberDetailFromAllList, setMemberDetailFromAllList] = useState(false);
  const { isOpen, open, close } = useModal(false);

  const handleMemberClick = useCallback(
    (member: MemberCardItem) => {
      setMemberDetailFromAllList(false);
      setSelectedMember(member);
      setModalMode('member');
      open();
    },
    [open],
  );

  const handleMemberClickInList = useCallback((member: MemberCardItem) => {
    setMemberDetailFromAllList(true);
    setSelectedMember(member);
    setModalMode('member');
  }, []);

  const handleBackToList = useCallback(() => {
    setMemberDetailFromAllList(false);
    setSelectedMember(null);
    setModalMode('all');
  }, []);

  const handleMoreClick = useCallback(() => {
    setMemberDetailFromAllList(false);
    setSelectedMember(null);
    setModalMode('all');
    open();
  }, [open]);

  const handleModalClose = useCallback(() => {
    close();
    setSelectedMember(null);
    setModalMode('member');
    setMemberDetailFromAllList(false);
  }, [close]);

  const sortedMembers = useMemo(
    () =>
      [...members].sort((a, b) => {
        const aAdmin = a.isAdmin ? 1 : 0;
        const bAdmin = b.isAdmin ? 1 : 0;
        return bAdmin - aAdmin;
      }),
    [members],
  );
  const rowInteractive = isMemberRowInteractive ?? true;

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
          onMemberClick={handleMemberClick}
          onMoreClick={handleMoreClick}
          canManageMembers={canManageMembers}
          currentUserId={currentUserId}
          onRemoveMember={onRemoveMember}
        />
      </section>

      <MemberCardModal
        isOpen={isOpen}
        open={open}
        close={handleModalClose}
        modalMode={modalMode}
        selectedMember={selectedMember}
        members={sortedMembers}
        onMemberClickInList={handleMemberClickInList}
        onBackToList={memberDetailFromAllList ? handleBackToList : undefined}
      />
    </>
  );
}
