import { Modal } from '@/shared/ui/modal';
import { Task } from '../../model/entities/task.model';
import { TaskCommonParams } from '../../model/params/task.params';
import TaskForm from '../create-task/TaskForm';
import { useUpdateTaskHandler } from '../../hooks/useUpdateTaskHandler';
import { toFormValues } from '../../lib/mappers/task.mapper';

type Props = {
  params: TaskCommonParams;
  task: Task;
  isOpen: boolean;
  onClose: () => void;
};

export default function TaskUpdateModalContent({ params, task, isOpen, onClose }: Props) {
  const { submit, isPending } = useUpdateTaskHandler(params, task, onClose);
  const initialValues = toFormValues(task);
  return (
    <Modal isOpen={isOpen} open={() => {}} close={onClose}>
      <Modal.Content size="md" className="sm:px-5 sm:py-8">
        <div className="flex-1 overflow-y-auto">
          <TaskForm initialValues={initialValues} onSubmit={submit} isPending={isPending} />
        </div>
      </Modal.Content>
    </Modal>
  );
}
