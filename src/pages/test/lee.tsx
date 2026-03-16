import { Button } from '@/shared/ui/Button';
import { IconAlert } from '@/shared/ui/icons';
import { Modal, useModal } from '@/shared/ui/modal';

export default function TestPage() {
  // 상태만 관리
  const { isOpen, open, close } = useModal();

  return (
    <Modal isOpen={isOpen} open={open} close={close}>
      {/* 2. Trigger는 내부에서 알아서 Context의 open을 호출합니다! (onClick 불필요) */}
      <Modal.Trigger asChild>
        <Button>팀 만들기</Button>
      </Modal.Trigger>

      {/* 3. 모달의 실제 UI는 Content 안에서 그려집니다. */}
      <Modal.Content showCloseButton={false}>
        <Modal.Header className="text-status-danger items-center">
          <IconAlert />
          <Modal.Title className="text-txt-primary pt-2 text-lg font-medium">
            회원 탈퇴를 진행하시겠어요?
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="flex items-center justify-center gap-2 text-center">
          <Modal.Description className="text-md text-txt-secondary font-medium">
            그룹장으로 있는 그룹은 자동으로 삭제되고,
            <br /> 모든 그룹에서 나가집니다.
          </Modal.Description>
        </Modal.Body>

        <Modal.Footer className="px-13">
          <Modal.Close asChild>
            <Button variant="outline" size="lg" isFullWidth>
              취소
            </Button>
          </Modal.Close>
          <Button
            variant="danger"
            size="lg"
            isFullWidth
            onClick={() => {
              close();
            }}
          >
            회원 탈퇴
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
