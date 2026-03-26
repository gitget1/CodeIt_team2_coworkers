import type { CSSProperties } from 'react';
import { useMemo } from 'react';
import { useDroppable } from '@dnd-kit/core';
import type { UniqueIdentifier } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { TaskBoardColumnStatus, TaskBoardTaskGroup } from '../model/taskBoard.types';
import { TASK_BOARD_COLUMN_STATUS_LABEL } from './taskBoardColumnLabels';
import { TaskCard } from './TaskCard';
import { TaskColumnStatusHeader } from './TaskColumnStatusHeader';
import { cn } from '@/shared/lib/cn';

export type TaskColumnProps = {
  status: TaskBoardColumnStatus;
  taskGroups: TaskBoardTaskGroup[];
  onAddCard: () => void;
  onTaskToggle?: (taskGroupId: string, taskId: string, checked: boolean) => void;
  activeTaskGroupId?: string | null;
  dropIndicatorId?: string | null;
};

const COLUMN_DROPPABLE_ID_PREFIX = 'task-board-column:';

function getColumnDroppableId(status: TaskBoardColumnStatus) {
  return `${COLUMN_DROPPABLE_ID_PREFIX}${status}`;
}

function SortableTaskCardItem({
  taskGroup,
  onTaskToggle,
  activeTaskGroupId,
  dropIndicatorId,
}: {
  taskGroup: TaskBoardTaskGroup;
  onTaskToggle?: (taskId: string, checked: boolean) => void;
  activeTaskGroupId?: string | null;
  dropIndicatorId?: string | null;
}) {
  const id: UniqueIdentifier = taskGroup.id;
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    transition: {
      duration: 260,
      easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
    },
  });

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const showDropIndicatorBefore = dropIndicatorId === `before:${taskGroup.id}` && activeTaskGroupId !== taskGroup.id;
  const showDropIndicatorAfter = dropIndicatorId === `after:${taskGroup.id}` && activeTaskGroupId !== taskGroup.id;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'relative will-change-transform transition-[opacity,transform] duration-200 ease-out',
        isDragging && 'opacity-60 scale-[1.01]',
      )}
    >
      {showDropIndicatorBefore && (
        <div className="pointer-events-none absolute -top-[6px] left-0 right-0 h-[3px] rounded-full bg-brand-primary" />
      )}
      <TaskCard
        taskGroup={taskGroup}
        setActivatorNodeRef={setActivatorNodeRef}
        dragAttributes={attributes as any}
        dragListeners={listeners as any}
        onTaskToggle={onTaskToggle}
      />
      {showDropIndicatorAfter && (
        <div className="pointer-events-none absolute -bottom-[6px] left-0 right-0 h-[3px] rounded-full bg-brand-primary" />
      )}
    </div>
  );
}

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
            <SortableTaskCardItem
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

