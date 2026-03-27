import { Modal } from '@/shared/ui/modal';
import { TaskCommonParams } from '../../model/params/task.params';
import { useDeleteTaskMutation } from '../../hooks/useDeleteTaskMutation';
import TaskDeleteForm from './TaskDeleteForm';

type Props = {
  params: TaskCommonParams;
  taskId: number;
  title: string;
  isOpen: boolean;
  onClose: () => void;
};

export default function TaskDeleteModalContent({ params, taskId, title, isOpen, onClose }: Props) {
  const { mutate, isPending } = useDeleteTaskMutation(params);

  return (
    <Modal isOpen={isOpen} open={() => {}} close={onClose}>
      <Modal.Content size="md" className="sm:px-5 sm:py-8">
        <TaskDeleteForm
          isPending={isPending}
          title={title}
          onClose={onClose}
          onConfirm={() => {
            if (isPending) return;

            mutate(taskId, {
              onSuccess: (result) => {
                if (!result.ok) return;
                onClose();
              },
            });
          }}
        />
      </Modal.Content>
    </Modal>
  );
}
