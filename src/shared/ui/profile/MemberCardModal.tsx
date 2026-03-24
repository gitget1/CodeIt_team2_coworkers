import { Modal } from '@/shared/ui/modal';
import { cn } from '@/shared/lib/cn';
import type { MemberCardItem, MemberCardModalMode } from './memberCard.types';
import { MemberCardModalMember } from './MemberCardModalMember';
import { MemberCardModalMembersList } from './MemberCardModalMembersList';

/** 전체 멤버 목록 스크롤 영역 상한 (50명+도 모달 안에서만 스크롤) */
const MEMBER_CARD_MODAL_LIST_MAX_H = 'max-h-[min(75dvh,40rem)]';

type Props = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  modalMode: MemberCardModalMode;
  selectedMember: MemberCardItem | null;
  members: MemberCardItem[];
};

export function MemberCardModal({ isOpen, open, close, modalMode, selectedMember, members }: Props) {
  return (
    <Modal isOpen={isOpen} open={open} close={close}>
      <Modal.Content size="sm" className="pb-4">
        <Modal.Header>
          <Modal.Title>{modalMode === 'all' ? '전체 멤버' : '멤버 정보'}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="flex min-h-0 min-w-0 flex-1 flex-col !overflow-hidden px-8 py-2">
          <div
            className={cn(
              'min-h-0 min-w-0 w-full flex-1 overflow-y-auto overscroll-y-contain [scrollbar-gutter:stable]',
              modalMode === 'all' && MEMBER_CARD_MODAL_LIST_MAX_H,
            )}
          >
            {modalMode === 'member' ? (
              <MemberCardModalMember member={selectedMember} />
            ) : (
              <MemberCardModalMembersList members={members} />
            )}
          </div>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
}
