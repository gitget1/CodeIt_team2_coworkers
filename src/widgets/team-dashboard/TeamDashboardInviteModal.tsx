import { Modal } from '@/shared/ui/modal';

type Props = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  isCopyingInviteLink: boolean;
  onCopyInviteLink: () => void;
};

export function TeamDashboardInviteModal({
  isOpen,
  open,
  close,
  isCopyingInviteLink,
  onCopyInviteLink,
}: Props) {
  return (
    <Modal isOpen={isOpen} open={open} close={close}>
      <Modal.Content size="sm">
        <Modal.Header className="w-full min-w-0 items-stretch pb-4">
          <Modal.Title className="break-words text-center text-lg font-medium text-txt-primary">
            멤버 초대
          </Modal.Title>
          <Modal.Description className="break-words text-center text-sm font-medium text-txt-secondary">
            그룹에 참여할 수 있는 링크를 복사합니다.
          </Modal.Description>
        </Modal.Header>
        <Modal.Footer className="pt-2">
          <button
            type="button"
            onClick={onCopyInviteLink}
            disabled={isCopyingInviteLink}
            className="h-12 w-full rounded-xl bg-brand-primary px-4 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isCopyingInviteLink ? '복사 중...' : '링크 복사하기'}
          </button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
