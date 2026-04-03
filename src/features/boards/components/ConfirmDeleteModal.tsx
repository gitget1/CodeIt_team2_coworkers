
import { Modal } from '@/shared/ui/modal';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;

  title?: string;
  description?: string;
  confirmText?: string;
};

export function ConfirmDeleteModal({
  isOpen,
  onClose,
  onConfirm,
  title = '삭제하시겠습니까?',
  description = '삭제된 데이터는 복구할 수 없습니다.',
  confirmText = '삭제하기',
}: Props) {
  return (
    <Modal isOpen={isOpen} close={onClose}>
      <Modal.Content size="sm">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onConfirm();
          }}
        >
          <Modal.Header className="pb-4">
            <Modal.Title>{title}</Modal.Title>
            <Modal.Description className="text-sm">
              {description}
            </Modal.Description>
          </Modal.Header>

          <Modal.Footer className="pt-2 flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="h-12 w-full rounded-xl border border-slate-300 text-sm font-semibold"
            >
              취소
            </button>

            <button
              type="submit"
              className="h-12 w-full rounded-xl bg-red-500 text-sm font-semibold text-white hover:opacity-90"
            >
              {confirmText}
            </button>
          </Modal.Footer>
        </form>
      </Modal.Content>
    </Modal>
  );
}