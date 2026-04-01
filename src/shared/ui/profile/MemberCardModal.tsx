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
  /** 「전체 멤버」목록에서 행 클릭 시 상세로 */
  onMemberClickInList?: (member: MemberCardItem) => void;
  /** 상세에서 목록으로 (목록에서 들어온 경우만) */
  onBackToList?: () => void;
};

export function MemberCardModal({
  isOpen,
  open,
  close,
  modalMode,
  selectedMember,
  members,
  onMemberClickInList,
  onBackToList,
}: Props) {
  return (
    <Modal isOpen={isOpen} open={open} close={close}>
      <Modal.Content size="sm" className={modalMode === 'member' ? 'pb-0' : 'pb-4'}>
        {modalMode === 'member' ? (
          <>
            <Modal.Header className="sr-only">
              <Modal.Title>
                {selectedMember ? `${selectedMember.name} 멤버 정보` : '멤버 정보'}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="!overflow-visible px-8 pb-8 pt-14">
              <MemberCardModalMember member={selectedMember} onBackToList={onBackToList} />
            </Modal.Body>
          </>
        ) : (
          <>
            <Modal.Header>
              <Modal.Title>전체 멤버</Modal.Title>
            </Modal.Header>
            <Modal.Body className="flex min-h-0 min-w-0 flex-1 flex-col !overflow-hidden px-8 py-2">
              <div
                className={cn(
                  'min-h-0 min-w-0 w-full flex-1 overflow-y-auto overscroll-y-contain [scrollbar-gutter:stable]',
                  MEMBER_CARD_MODAL_LIST_MAX_H,
                )}
              >
                <MemberCardModalMembersList members={members} onMemberClick={onMemberClickInList} />
              </div>
            </Modal.Body>
          </>
        )}
      </Modal.Content>
    </Modal>
  );
}
