import { Modal } from '@/shared/ui/modal';

type Props = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  teamName: string;
  isLeaving: boolean;
  onConfirm: () => void;
};

const footerBtnBase =
  'h-12 w-full rounded-xl px-4 text-sm font-semibold transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60';

export function TeamDashboardLeaveTeamModal({
  isOpen,
  open,
  close,
  teamName,
  isLeaving,
  onConfirm,
}: Props) {
  return (
    <Modal isOpen={isOpen} open={open} close={close}>
      <Modal.Content size="sm" className="[&_button]:cursor-pointer [&_button:disabled]:cursor-not-allowed">
        <Modal.Header className="pb-4">
          <Modal.Title className="text-xl font-medium text-txt-primary">팀에서 나가시겠어요?</Modal.Title>
          <Modal.Description className="text-base font-medium text-txt-secondary">
            {teamName}에서 나가면 이 팀의 할 일과 멤버 목록에 더 이상 접근할 수 없습니다.
          </Modal.Description>
        </Modal.Header>
        <Modal.Footer className="flex flex-col gap-2 pt-2">
          <Modal.Close asChild>
            <button
              type="button"
              disabled={isLeaving}
              className={`${footerBtnBase} border border-background-tertiary bg-background-primary text-txt-primary`}
            >
              취소
            </button>
          </Modal.Close>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLeaving}
            className={`${footerBtnBase} bg-red-500 text-white`}
          >
            {isLeaving ? '처리 중...' : '나가기'}
          </button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
