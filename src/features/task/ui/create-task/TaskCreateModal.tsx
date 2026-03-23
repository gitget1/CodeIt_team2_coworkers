import { useEffect } from 'react';
import { Modal } from '@/shared/ui/modal';
import { useCreateTaskMutation } from '../../hooks/useCreateTaskMutation';
import { useTaskForm } from './useTaskForm';
import TaskForm from './TaskForm';
import { TaskCreateModalProps } from './taskForm.types';

export default function TaskCreateModal({ isOpen, onClose, params }: TaskCreateModalProps) {
  const { mutate, isPending } = useCreateTaskMutation(params);
  const form = useTaskForm();

  const handleSubmit = () => {
    if (!form.title.trim()) return;

    mutate(form.createPayload(), {
      onSuccess: () => {
        form.resetForm();
        onClose();
      },
    });
  };

  useEffect(() => {
    if (!isOpen) return;
    form.resetForm();
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} open={() => {}} close={onClose}>
      <Modal.Content size="md" className="overflow-visible px-6 py-8 sm:px-8 sm:py-10">
        <TaskForm form={form} onSubmit={handleSubmit} isPending={isPending} />
      </Modal.Content>
    </Modal>
  );
}
