import { useMemo } from 'react';
import type { TaskBoardColumnStatus, TaskBoardTaskGroup } from '../model/taskBoard.types';
import { TASK_BOARD_COLUMN_STATUS_LABEL } from './taskBoardColumnLabels';
import { TaskCard } from './TaskCard';
import { TaskColumnStatusHeader } from './TaskColumnStatusHeader';

export type TaskColumnProps = {
  status: TaskBoardColumnStatus;
  taskGroups: TaskBoardTaskGroup[];
  onAddCard: () => void;
};

export function TaskColumn({ status, taskGroups, onAddCard }: TaskColumnProps) {
  const label = useMemo(() => TASK_BOARD_COLUMN_STATUS_LABEL[status], [status]);

  return (
    <div className="flex flex-col gap-[12px]">
      <TaskColumnStatusHeader label={label} onAdd={onAddCard} />
      <div className="flex flex-col gap-[12px]">
        {taskGroups.map((group) => (
          <TaskCard key={group.id} columnStatus={status} taskGroup={group} />
        ))}
      </div>
    </div>
  );
}

