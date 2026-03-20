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
};

type MetaItemProps = {
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

function MetaItem({ icon, children, className }: MetaItemProps) {
  return (
    <div className="text-txt-default flex items-center gap-1 text-xs">
      {icon}
      <span>{children}</span>
    </div>
  );
}

export default function TaskItem({ task, params }: Props & { params: TaskCommonParams }) {
  const { mutate } = useToggleTaskMutation(params);

  const handleToggle = () => {
    mutate({
      teamId: params.teamId,
      groupId: params.groupId,
      taskListId: params.taskListId,
      taskId: task.id,
      name: task.title,
      description: task.description,
      done: !task.isCompleted,
    });
  };
  return (
    <li className="border-background-tertiary flex items-start justify-between rounded-lg border bg-white px-3 py-2 hover:cursor-pointer">
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <Checkbox size="lg" checked={task.isCompleted} onChange={handleToggle} />
          <p
            className={`text-sm transition-colors ${task.isCompleted ? 'text-gray-400 line-through' : 'text-txt-primary'}`}
          >
            {task.title}
          </p>
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
