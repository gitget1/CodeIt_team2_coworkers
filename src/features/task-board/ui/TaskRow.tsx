import { Checkbox } from '@/shared/ui/checkbox';
import { cn } from '@/shared/lib/cn';
import type { TaskBoardTask } from '../model/taskBoard.types';

export type TaskRowProps = {
  task: TaskBoardTask;
  onToggle?: (checked: boolean) => void;
};

export function TaskRow({ task, onToggle }: TaskRowProps) {
  const isDisabled = !!onToggle;

  return (
    <div className="flex items-center gap-2">
      <span
        onClick={(event) => event.stopPropagation()}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <Checkbox
          size="sm"
          checked={task.completed}
          onChange={(checked) => onToggle?.(checked)}
          disabled={!isDisabled}
          aria-label={`${task.title} 체크`}
        />
      </span>
      <span
        className={cn(
          'min-w-0 flex-1 truncate text-sm',
          task.completed ? 'line-through text-txt-secondary' : 'text-txt-primary',
        )}
      >
        {task.title}
      </span>
    </div>
  );
}

