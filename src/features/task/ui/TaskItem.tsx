import Checkbox from '@/shared/ui/checkbox';
import { Task } from '../model/entities/task.model';
import { IconCalendar } from '@/shared/ui/icons/IconCalendar';
import { IconRepeat } from '@/shared/ui/icons/IconRepeat';
import { formatDate } from '@/shared/lib/date';
import { IconComment } from '@/shared/ui/icons/IconComment';
import { useToggleTaskMutation } from '../hooks/useToggleTaskMutation';
import { TaskCommonParams } from '../model/params/task.params';
import Dropdown from '@/shared/ui/dropdown';
import { RECURRENCE_LABEL_MAP } from '../model/constants/recurrenceLabel';

type Props = {
  task: Task;
  onClick: (task: Task) => void;
  params: TaskCommonParams;
  onDeleteClick: (task: Task) => void;
  onEditClick: (task: Task) => void;
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

export default function TaskItem({ task, onClick, params, onDeleteClick, onEditClick }: Props) {
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
      className="border-background-tertiary relative flex items-start justify-between gap-2 rounded-lg border bg-white px-2.5 py-2 hover:cursor-pointer md:gap-3 md:px-3 md:py-2.5"
    >
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <div
          className="flex flex-wrap items-center gap-x-2 gap-y-1"
          onClick={(e) => e.stopPropagation()}
        >
          <Checkbox id={checkboxId} size="lg" checked={task.isCompleted} onChange={handleToggle} />
          <label
            htmlFor={checkboxId}
            className={`min-w-0 flex-1 cursor-pointer text-sm transition-colors md:text-sm ${task.isCompleted ? 'text-gray-400 line-through' : 'text-txt-primary'}`}
          >
            {task.title}
          </label>
          <MetaItem icon={<IconComment />}>{task.commentCount}</MetaItem>
        </div>

        <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 md:mt-0 md:gap-2">
          <MetaItem icon={<IconCalendar />}>{task.date && formatDate(task.date)}</MetaItem>
          <span className="bg-txt-secondary h-3 w-px" />
          <MetaItem icon={<IconRepeat />}>{RECURRENCE_LABEL_MAP[task.recurrence]}</MetaItem>
        </div>
      </div>
      <Dropdown>
        <Dropdown.Trigger
          onClick={(e) => e.stopPropagation()}
          className="text-icon-primary cursor-pointer rounded p-1"
        >
          ...
        </Dropdown.Trigger>
        <Dropdown.Menu className="absolute right-0 z-50 mt-2 w-28">
          <Dropdown.Item
            onClick={(e) => {
              e.stopPropagation();
              onEditClick(task);
            }}
            className="px-3 py-2"
          >
            수정하기
          </Dropdown.Item>
          <Dropdown.Item
            onClick={(e) => {
              e.stopPropagation();
              onDeleteClick(task);
            }}
            className="px-3 py-2"
          >
            삭제하기
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </li>
  );
}
