import Checkbox from '@/shared/ui/checkbox';
import { Task } from '../model/entities/task.model';
import { IconCalendar } from '@/shared/ui/icons/IconCalendar';
import { IconRepeat } from '@/shared/ui/icons/IconRepeat';
import { formatDate } from '@/shared/lib/date';
import { IconComment } from '@/shared/ui/icons/IconComment';
import { useToggleTaskMutation } from '../hooks/useToggleTaskMutation';
import { TaskCommonParams } from '../model/params/task.params';

type Props = {
  task: Task;
  onClick: (task: Task) => void;
  params: TaskCommonParams;
};

type MetaItemProps = {
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

function MetaItem({ icon, children }: MetaItemProps) {
  return (
    <div className="text-txt-default flex items-center gap-1 text-xs">
      {icon}
      <span>{children}</span>
    </div>
  );
}

export default function TaskItem({ task, onClick, params }: Props) {
  const { mutate } = useToggleTaskMutation(params);
  const checkboxId = `task-${task.id}`;

  const handleToggle = (checked: boolean) => {
    mutate({
      groupId: params.groupId,
      taskListId: params.taskListId,
      taskId: task.id,
      done: checked,
    });
  };
  return (
    <li
      onClick={() => onClick(task)}
      className="border-background-tertiary flex items-start justify-between rounded-lg border bg-white px-3 py-2 hover:cursor-pointer"
    >
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <Checkbox
            id={checkboxId}
            size="lg"
            checked={task.isCompleted}
            onChange={handleToggle}
            onClick={(e) => e.stopPropagation()}
          />
          <label
            htmlFor={checkboxId}
            className={`cursor-pointer text-sm transition-colors ${task.isCompleted ? 'text-gray-400 line-through' : 'text-txt-primary'}`}
          >
            {task.title}
          </label>
          <MetaItem icon={<IconComment />}>{task.commentCount}</MetaItem>
        </div>

        <div className="flex items-center gap-2">
          <MetaItem icon={<IconCalendar />}>{task.date && formatDate(task.date)}</MetaItem>
          <span className="bg-txt-secondary h-3 w-px" />
          <MetaItem icon={<IconRepeat />}>{task.recurrence}</MetaItem>
        </div>
      </div>

      <button className="text-gray-400 hover:text-gray-600">...</button>
    </li>
  );
}
