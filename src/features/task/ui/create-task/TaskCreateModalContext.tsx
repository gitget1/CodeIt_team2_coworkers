import { Modal } from '@/shared/ui/modal';
import { useCreateTaskMutation } from '../../hooks/useCreateTaskMutation';
import TaskForm from './TaskForm';
import { INITIAL_TASK_FORM_VALUES, TaskFormValues } from './taskForm.types';
import { toCreateTaskPayload } from '../../lib/createTaskPayload';
import { TaskCommonParams } from '../../model/params/task.params';
import { isValidTaskFormValues } from '../../lib/validateTaskForm';

type Props = {
  params: TaskCommonParams;
  isOpen: boolean;
  onClose: () => void;
};

export default function TaskCreateModalContent({ params, isOpen, onClose }: Props) {
  const { mutate, isPending } = useCreateTaskMutation(params);

  const handleSubmit = (data: TaskFormValues) => {
    if (!isValidTaskFormValues(data)) return;
    if (isPending) return;

    const payload = toCreateTaskPayload(data);

    mutate(payload, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Modal isOpen={isOpen} open={() => {}} close={onClose}>
      <Modal.Content size="md" className="sm:px-5 sm:py-8">
        <div className="flex-1 overflow-y-auto">
          <TaskForm
            initialValues={INITIAL_TASK_FORM_VALUES}
            onSubmit={handleSubmit}
            isPending={isPending}
          />
        </div>
      </Modal.Content>
    </Modal>
  );
}
