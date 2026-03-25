import { Modal } from '@/shared/ui/modal';
import { useCreateTaskMutation } from '../../hooks/useCreateTaskMutation';
import TaskForm from './TaskForm';
import { useTaksParams } from '../../lib/useTaskParams';

type TaskCreateModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function TaskCreateModal({ isOpen, onClose }: TaskCreateModalProps) {
  const params = useTaksParams();
  if (!params) return null;
  const { mutate, isPending } = useCreateTaskMutation(params);

  return (
    <Modal isOpen={isOpen} open={() => {}} close={onClose}>
      <Modal.Content size="md" className="sm:px-5 sm:py-8">
        <div className="flex-1 overflow-y-auto">
          <TaskForm mutate={mutate} isPending={isPending} onSuccess={onClose} />
        </div>
      </Modal.Content>
    </Modal>
  );
}
