import { useState } from 'react';

type Params = {
  onUpdateTaskGroup?: (params: { taskGroupId: string; title: string }) => Promise<boolean> | boolean;
  onDeleteTaskGroup?: (params: { taskGroupId: string }) => Promise<boolean> | boolean;
  setCardNameLocal: (taskGroupId: string, title: string) => void;
  removeCardLocal: (taskGroupId: string) => void;
};

export function useTaskBoardCardActions({
  onUpdateTaskGroup,
  onDeleteTaskGroup,
  setCardNameLocal,
  removeCardLocal,
}: Params) {
  const [editingCard, setEditingCard] = useState<{ taskGroupId: string; title: string } | null>(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [deletingCardId, setDeletingCardId] = useState<string | null>(null);

  const openEditCardModal = (taskGroupId: string, currentTitle: string) => {
    setEditingCard({ taskGroupId, title: currentTitle });
    setEditedTitle(currentTitle);
  };

  const closeEditModal = () => setEditingCard(null);

  const handleConfirmEditCard = async () => {
    if (!editingCard) return;
    const trimmedTitle = editedTitle.trim();
    if (!trimmedTitle || trimmedTitle === editingCard.title) {
      closeEditModal();
      return;
    }

    // false: API/비즈니스 실패. undefined: 콜백 없음(목 데이터 등) → 로컬만 반영.
    const ok = await onUpdateTaskGroup?.({ taskGroupId: editingCard.taskGroupId, title: trimmedTitle });
    if (ok === false) return;

    setCardNameLocal(editingCard.taskGroupId, trimmedTitle);
    closeEditModal();
  };

  const openDeleteCardModal = (taskGroupId: string) => {
    setDeletingCardId(taskGroupId);
  };

  const handleConfirmDeleteCard = async () => {
    if (!deletingCardId) return;

    const ok = await onDeleteTaskGroup?.({ taskGroupId: deletingCardId });
    if (ok === false) return;

    removeCardLocal(deletingCardId);
    setDeletingCardId(null);
  };

  return {
    editingCard,
    editedTitle,
    setEditedTitle,
    setEditingCard,
    deletingCardId,
    setDeletingCardId,
    openEditCardModal,
    handleConfirmEditCard,
    openDeleteCardModal,
    handleConfirmDeleteCard,
  };
}
