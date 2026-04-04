import { Modal } from '@/shared/ui/modal';

type Props = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  teamName: string;
  isDeleting: boolean;
  onConfirm: () => void;
};

const footerBtnBase =
  'h-12 w-full rounded-xl px-4 text-sm font-semibold transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60';

export function TeamDashboardDeleteTeamModal({
  isOpen,
  open,
  close,
  teamName,
  isDeleting,
  onConfirm,
}: Props) {
  return (
    <Modal isOpen={isOpen} open={open} close={close}>
      <Modal.Content size="sm" className="[&_button]:cursor-pointer [&_button:disabled]:cursor-not-allowed">
        <Modal.Header className="pb-4">
          <Modal.Title className="text-lg font-medium text-txt-primary">팀을 삭제하시겠어요?</Modal.Title>
          <Modal.Description className="text-sm font-medium text-txt-secondary">
            {teamName} 팀이 삭제되며, 되돌릴 수 없습니다.
          </Modal.Description>
        </Modal.Header>
        <Modal.Footer className="flex flex-col gap-2 pt-2">
          <Modal.Close asChild>
            <button
              type="button"
              disabled={isDeleting}
              className={`${footerBtnBase} border border-background-tertiary bg-background-primary text-txt-primary`}
            >
              취소
            </button>
          </Modal.Close>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className={`${footerBtnBase} bg-red-500 text-white`}
          >
            {isDeleting ? '처리 중...' : '삭제하기'}
          </button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
