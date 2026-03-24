import { useCallback, useMemo, useState } from 'react';
import { cn } from '@/shared/lib/cn';
import { MemberCardMembersSection } from './MemberCardMembersSection';
import { useIsMobileOrTablet } from './useIsMobileOrTablet';
import { useModal } from '@/shared/ui/modal';
import type { MemberCardItem, MemberCardModalMode, MemberCardProps } from './memberCard.types';
import { MemberCardModal } from './MemberCardModal';

export function MemberCard({
  members,
  title = '멤버',
  className,
  maxVisibleCount = 5,
  onInvite,
}: MemberCardProps) {
  const [selectedMember, setSelectedMember] = useState<MemberCardItem | null>(null);
  const [modalMode, setModalMode] = useState<MemberCardModalMode>('member');
  const isMobileOrTablet = useIsMobileOrTablet();
  const { isOpen, open, close } = useModal(false);

  const handleMemberClick = useCallback(
    (member: MemberCardItem) => {
      if (!isMobileOrTablet) return;
      setSelectedMember(member);
      setModalMode('member');
      open();
    },
    [isMobileOrTablet, open],
  );

  const handleMoreClick = useCallback(() => {
    setSelectedMember(null);
    setModalMode('all');
    open();
  }, [open]);

  const sortedMembers = useMemo(
    () =>
      [...members].sort((a, b) => {
        const aAdmin = a.isAdmin ? 1 : 0;
        const bAdmin = b.isAdmin ? 1 : 0;
        return bAdmin - aAdmin;
      }),
    [members],
  );

  return (
    <>
      <section
        className={cn(
          'flex w-[240px] flex-col gap-6 overflow-hidden rounded-xl border border-background-tertiary bg-background-primary px-5 pt-6 pb-4',
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
          onMemberClick={handleMemberClick}
          onMoreClick={handleMoreClick}
        />
      </section>

      <MemberCardModal
        isOpen={isOpen}
        open={open}
        close={close}
        modalMode={modalMode}
        selectedMember={selectedMember}
        members={sortedMembers}
      />
    </>
  );
}
