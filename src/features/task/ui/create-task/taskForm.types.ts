import { TaskCommonParams } from '../../model/params/task.params';

export type TaskFormValues = {
  title: string;
  description: string;
  date?: Date;
  time?: string;
  recurrence: 'ONCE' | 'DAILY' | 'WEEKLY' | 'MONTHLY';
  selectedDays: number[];
};

export type TaskCreateModalProps = {
  isOpen: boolean;
  onClose: () => void;
  params: TaskCommonParams;
};
