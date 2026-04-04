import { Modal } from '@/shared/ui/modal';
import { TaskCommonParams } from '../../model/params/task.params';
import { useDeleteTaskMutation } from '../../hooks/useDeleteTaskMutation';
import TaskDeleteForm from './TaskDeleteForm';

type Props = {
  params: TaskCommonParams;
  taskId: number;
  title: string;
  onClose: () => void;
  /** 삭제 API 성공 직후 (모달 닫기 전) */
  onDeleteSuccess?: () => void;
};

export default function TaskDeleteModalContent({
  params,
  taskId,
  title,
  onClose,
  onDeleteSuccess,
}: Props) {
  const { mutate, isPending } = useDeleteTaskMutation(params);

  return (
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
              onDeleteSuccess?.();
              onClose();
            },
          });
        }}
      />
    </Modal.Content>
  );
}
