import { Modal, useModal } from '@/shared/ui/modal';
import { Button } from '@/shared/ui/Button';

// 폼 외부 에서 강제로 열어야 함
interface UnsavedChangesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmLeave: () => void;
}

export function UnsavedChangesModal({ isOpen, onClose, onConfirmLeave }: UnsavedChangesModalProps) {
  return (
    <Modal isOpen={isOpen} open={() => {}} close={onClose}>
      <Modal.Content size="sm" showCloseButton={false}>
        <Modal.Header className="pt-8">
          <Modal.Title className="text-center">저장하지 않은 변경사항이 있습니다</Modal.Title>
        </Modal.Header>

        <Modal.Body className="mt-2 px-6">
          <Modal.Description className="text-txt-secondary text-center">
            변경된 내용이 저장되지 않았습니다.
            <br />
            저장하지 않고 이동하시겠습니까?
          </Modal.Description>
        </Modal.Body>

        <Modal.Footer className="mt-4 flex w-full gap-2 px-6 pb-8">
          <Button variant="outline" size="lg" className="flex-1" onClick={onClose}>
            계속 작성하기
          </Button>
          <Button variant="primary" size="lg" className="flex-1" onClick={onConfirmLeave}>
            저장 안 하고 이동
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
