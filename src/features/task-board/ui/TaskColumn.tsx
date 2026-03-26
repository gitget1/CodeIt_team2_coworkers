import { useMemo } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import type { TaskBoardColumnStatus, TaskBoardTaskGroup } from '../model/taskBoard.types';
import { TASK_BOARD_COLUMN_STATUS_LABEL } from './taskBoardColumnLabels';
import { TaskColumnStatusHeader } from './TaskColumnStatusHeader';
import { cn } from '@/shared/lib/cn';
import { TaskSortableCardItem } from './TaskSortableCardItem';

export type TaskColumnProps = {
  status: TaskBoardColumnStatus;
  taskGroups: TaskBoardTaskGroup[];
  onAddCard: () => void;
  onTaskToggle?: (taskGroupId: string, taskId: string, checked: boolean) => void;
  activeTaskGroupId?: string | null;
  dropIndicatorId?: string | null;
};

const COLUMN_DROPPABLE_ID_PREFIX = 'task-board-column:';
const getColumnDroppableId = (status: TaskBoardColumnStatus) => `${COLUMN_DROPPABLE_ID_PREFIX}${status}`;

export function TaskColumn({
  status,
  taskGroups,
  onAddCard,
  onTaskToggle,
  activeTaskGroupId,
  dropIndicatorId,
}: TaskColumnProps) {
  const label = TASK_BOARD_COLUMN_STATUS_LABEL[status];
  const droppableId = useMemo(() => getColumnDroppableId(status), [status]);
  const { setNodeRef } = useDroppable({ id: droppableId });
  const isColumnDropTarget = dropIndicatorId === `column:${droppableId}`;
  const lastTaskGroupId = taskGroups.length > 0 ? taskGroups[taskGroups.length - 1].id : null;
  const showBottomDropIndicator =
    isColumnDropTarget && taskGroups.length > 0 && activeTaskGroupId !== lastTaskGroupId;

  const itemIds = taskGroups.map((g) => g.id);

  return (
    <div className="flex flex-col gap-[12px]">
      <TaskColumnStatusHeader label={label} onAddTask={onAddCard} />

      <div
        ref={setNodeRef}
        className={cn(
          'flex flex-col gap-[12px] rounded-[12px] transition-colors duration-200',
          isColumnDropTarget && 'bg-brand-secondary/60 p-[6px]',
        )}
      >
        <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
          {taskGroups.map((group) => (
            <TaskSortableCardItem
              key={group.id}
              taskGroup={group}
              onTaskToggle={onTaskToggle ? (taskId, checked) => onTaskToggle(group.id, taskId, checked) : undefined}
              activeTaskGroupId={activeTaskGroupId}
              dropIndicatorId={dropIndicatorId}
            />
          ))}
        </SortableContext>
        {showBottomDropIndicator && (
          <div className="pointer-events-none h-[3px] rounded-full bg-brand-primary" />
        )}
      </div>
    </div>
  );
}

