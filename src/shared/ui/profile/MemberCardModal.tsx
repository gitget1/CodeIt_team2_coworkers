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
  onClose: () => void;
  modalMode: MemberCardModalMode;
  selectedMember: MemberCardItem | null;
  members: MemberCardItem[];
  /** 「전체 멤버」목록에서 행 클릭 시 상세로 */
  onMemberClickInList?: (member: MemberCardItem) => void;
  /** 상세에서 목록으로 (목록에서 들어온 경우만) */
  onBackToList?: () => void;
  /**
   * 전체 멤버 목록 헤더에 `초대하기 +` 표시(멤버카드와 동일 스타일).
   * 보통 부모에서 멤버 모달을 닫은 뒤 초대 모달을 열도록 연결합니다.
   */
  onInvite?: () => void;
};

export function MemberCardModal({
  isOpen,
  open,
  onClose,
  modalMode,
  selectedMember,
  members,
  onMemberClickInList,
  onBackToList,
  onInvite,
}: Props) {
  return (
    <Modal isOpen={isOpen} open={open} close={onClose}>
      <Modal.Content
        size="sm"
        className={cn(
          '[&_button]:cursor-pointer [&_button:disabled]:cursor-not-allowed',
          modalMode === 'member' ? 'pb-0' : 'pb-4',
        )}
      >
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
            <Modal.Header className="w-full min-w-0 flex-row items-center justify-between gap-3 px-8 pt-10 pb-0">
              <Modal.Title className="min-w-0 flex-1 truncate text-left text-base font-bold text-txt-primary">
                전체 멤버{' '}
                <span className="font-bold text-txt-default">({members.length}명)</span>
              </Modal.Title>
              {onInvite != null ? (
                <button
                  type="button"
                  onClick={onInvite}
                  className="shrink-0 touch-manipulation py-2 text-sm font-semibold text-brand-primary hover:underline sm:py-0"
                >
                  초대하기 +
                </button>
              ) : null}
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
