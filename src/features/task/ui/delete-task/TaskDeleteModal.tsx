import { useTaskParams } from '../../lib/useTaskParams';
import TaskDeleteModalContent from './TaskDeleteModalContent';

type Props = {
  taskId: number;
  title: string;
  isOpen: boolean;
  onClose: () => void;
};

export default function TaskDeleteModal({ taskId, title, isOpen, onClose }: Props) {
  const params = useTaskParams();

  if (!isOpen || !params) return null;

  return (
    <TaskDeleteModalContent
      params={params}
      taskId={taskId}
      title={title}
      isOpen={isOpen}
      onClose={onClose}
    />
  );
}
