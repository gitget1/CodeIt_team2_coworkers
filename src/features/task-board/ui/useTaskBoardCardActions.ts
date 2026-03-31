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

  const handleConfirmEditCard = async () => {
    if (!editingCard) return;
    const trimmedTitle = editedTitle.trim();
    if (!trimmedTitle || trimmedTitle === editingCard.title) {
      setEditingCard(null);
      return;
    }

    const updated = await onUpdateTaskGroup?.({ taskGroupId: editingCard.taskGroupId, title: trimmedTitle });
    if (updated === false) return;

    setCardNameLocal(editingCard.taskGroupId, trimmedTitle);
    setEditingCard(null);
  };

  const openDeleteCardModal = (taskGroupId: string) => {
    setDeletingCardId(taskGroupId);
  };

  const handleConfirmDeleteCard = async () => {
    if (!deletingCardId) return;

    const deleted = await onDeleteTaskGroup?.({ taskGroupId: deletingCardId });
    if (deleted === false) return;

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
