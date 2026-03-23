import { useCallback, useState } from 'react';
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

  return (
    <>
      <section
        className={cn(
          'rounded-[20px] border border-background-tertiary bg-background-primary p-5',
          className,
        )}
      >
        <header className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-txt-primary">
            {title} <span className="text-txt-default">({members.length}명)</span>
          </h3>
          <button
            type="button"
            onClick={onInvite}
            className="text-lg font-semibold text-brand-primary hover:underline"
          >
            초대하기 +
          </button>
        </header>
        <MemberCardMembersSection
          members={members}
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
        members={members}
      />
    </>
  );
}
