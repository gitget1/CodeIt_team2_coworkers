import { DeleteTaskGroupModal } from './DeleteTaskGroupModal';
import { EditTaskGroupModal } from './EditTaskGroupModal';

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
      <EditTaskGroupModal
        isOpen={editingCard !== null}
        onClose={() => setEditingCard(null)}
        editedTitle={editedTitle}
        onEditedTitleChange={setEditedTitle}
        onConfirmEdit={onConfirmEdit}
      />
      <DeleteTaskGroupModal
        isOpen={deletingCardId !== null}
        onClose={() => setDeletingCardId(null)}
        onConfirmDelete={onConfirmDelete}
      />
    </>
  );
}
