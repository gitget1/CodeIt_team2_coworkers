import { Modal } from '@/shared/ui/modal';

type Props = {
  editingCard: { taskGroupId: string; title: string } | null;
  editedTitle: string;
  setEditedTitle: (value: string) => void;
  setEditingCard: (value: { taskGroupId: string; title: string } | null) => void;
  onConfirmEdit: () => void;
  deletingCardId: string | null;
  setDeletingCardId: (value: string | null) => void;
  onConfirmDelete: () => void;
};

export function TaskBoardCardActionModals({
  editingCard,
  editedTitle,
  setEditedTitle,
  setEditingCard,
  onConfirmEdit,
  deletingCardId,
  setDeletingCardId,
  onConfirmDelete,
}: Props) {
  return (
    <>
      <Modal isOpen={editingCard !== null} close={() => setEditingCard(null)}>
        <Modal.Content className="px-5">
          <Modal.Header className="pt-12 pb-2">
            <Modal.Title className="text-lg">할 일 목록 수정</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              value={editedTitle}
              onChange={(event) => setEditedTitle(event.target.value)}
              placeholder="목록 명을 입력해주세요."
              className="h-12 w-full rounded-xl border border-background-tertiary px-4 text-sm outline-none focus:border-brand-primary"
              autoFocus
            />
          </Modal.Body>
          <Modal.Footer className="pt-2">
            <button
              type="button"
              onClick={onConfirmEdit}
              className="h-12 w-full rounded-xl bg-brand-primary px-4 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              저장하기
            </button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

      <Modal isOpen={deletingCardId !== null} close={() => setDeletingCardId(null)}>
        <Modal.Content size="sm">
          <Modal.Header className="pb-4">
            <Modal.Title>할 일 목록을 삭제할까요?</Modal.Title>
            <Modal.Description className="text-sm">
              삭제된 목록은 복구할 수 없습니다.
            </Modal.Description>
          </Modal.Header>
          <Modal.Footer className="pt-2">
            <button
              type="button"
              onClick={onConfirmDelete}
              className="h-12 w-full rounded-xl bg-red-500 px-4 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              삭제하기
            </button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
}
