import { useState } from 'react';
import { useCreateComment } from '../hooks/useCreateComment';
import { useDeleteComment } from '../hooks/useDeleteComment';
import { useUpdateComment } from '../hooks/useUpdateComment';

export function useCommentSection(articleId: number) {
  const { createComment, isCreating } = useCreateComment();
  const { deleteComment } = useDeleteComment(articleId);
  const { updateComment } = useUpdateComment(articleId);

  const [commentInput, setCommentInput] = useState('');
  const [updateInputs, setUpdateInputs] = useState<{ [id: number]: string }>({});
  const [editCommentIds, setEditCommentIds] = useState<Set<number>>(new Set());
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const handleCreateComment = () => {
    if (!commentInput.trim()) return;
    createComment(articleId, commentInput);
    setCommentInput('');
  };

  const handleInputChange = (id: number, value: string) => {
    setUpdateInputs((prev) => ({ ...prev, [id]: value }));
  };

  const toggleEdit = (id: number, content?: string) => {
    setEditCommentIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
        setUpdateInputs((prev) => ({ ...prev, [id]: content || '' }));
      }
      return newSet;
    });
  };
  const openDeleteModal = (id: number) => {
    setDeleteTargetId(id);
    setIsDeleteOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteTargetId(null);
    setIsDeleteOpen(false);
  };
  const confirmDelete = () => {
    if (deleteTargetId !== null) {
      deleteComment(deleteTargetId);
      closeDeleteModal();
    }
  };
  const isActive = commentInput.trim().length > 0 && !isCreating;
  return {
    commentInput,
    setCommentInput,
    updateInputs,
    editCommentIds,
    isCreating,
    isActive,
    handleCreateComment,
    handleInputChange,
    toggleEdit,
    deleteComment,
    updateComment,
    openDeleteModal,
    closeDeleteModal,
    confirmDelete,
    isDeleteOpen,
  };
}
