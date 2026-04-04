import { Modal } from '@/shared/ui/modal';
import { useTaskParams } from '../../lib/useTaskParams';
import TaskDeleteModalContent from './TaskDeleteModalContent';

type Props = {
  taskId: number;
  title: string;
  onClose: () => void;
  onDeleteSuccess?: () => void;
};

export default function TaskDeleteModal({ taskId, title, onClose, onDeleteSuccess }: Props) {
  const params = useTaskParams();

  if (!params) return null;

  return (
    <Modal isOpen open={() => {}} close={onClose}>
      <TaskDeleteModalContent
        params={params}
        taskId={taskId}
        title={title}
        onClose={onClose}
        onDeleteSuccess={onDeleteSuccess}
      />
    </Modal>
  );
}
