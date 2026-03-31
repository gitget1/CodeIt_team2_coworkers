import type { MemberCardItem } from '@/shared/ui/profile';
import { Modal } from '@/shared/ui/modal';

type Props = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  memberToRemove: MemberCardItem | null;
  isRemovingMember: boolean;
  onConfirmRemoveMember: () => void;
};

export function TeamDashboardRemoveMemberModal({
  isOpen,
  open,
  close,
  memberToRemove,
  isRemovingMember,
  onConfirmRemoveMember,
}: Props) {
  return (
    <Modal isOpen={isOpen} open={open} close={close}>
      <Modal.Content size="sm">
        <Modal.Header className="pb-4">
          <Modal.Title>멤버를 탈퇴시키시겠어요?</Modal.Title>
          <Modal.Description className="text-sm">
            {memberToRemove
              ? `${memberToRemove.name}님을 이 그룹에서 제외합니다.`
              : '선택한 멤버를 이 그룹에서 제외합니다.'}
          </Modal.Description>
        </Modal.Header>
        <Modal.Footer className="pt-2">
          <button
            type="button"
            onClick={onConfirmRemoveMember}
            disabled={isRemovingMember || !memberToRemove}
            className="h-12 w-full rounded-xl bg-red-500 px-4 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isRemovingMember ? '처리 중...' : '퇴출'}
          </button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
