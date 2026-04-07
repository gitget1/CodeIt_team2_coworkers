import { useTaskParams } from '../../lib/useTaskParams';
import TaskCreateModalContent from './TaskCreateModalContext';

type TaskCreateModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function TaskCreateModal({ isOpen, onClose }: TaskCreateModalProps) {
  const params = useTaskParams();
  if (!isOpen || !params) return null;
  return <TaskCreateModalContent params={params} isOpen={isOpen} onClose={onClose} />;
}
