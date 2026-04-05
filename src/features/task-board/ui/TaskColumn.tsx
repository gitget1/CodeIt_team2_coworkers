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
  onEditCard?: (taskGroupId: string, currentTitle: string) => void;
  onDeleteCard?: (taskGroupId: string) => void;
  onOpenTaskList?: (taskGroupId: string) => void;
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
  onEditCard,
  onDeleteCard,
  onOpenTaskList,
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
  /** 카드가 없을 때도 컬럼 droppable 위에 있으면 삽입 위치를 선으로 표시 */
  const showEmptyColumnDropIndicator =
    isColumnDropTarget && taskGroups.length === 0 && activeTaskGroupId != null;

  const firstGroupId = taskGroups[0]?.id;
  /** 정렬 전략이 첫 카드를 아래로 밀 때 카드에 붙은 before 선이 헤더에서 멀어지므로, 컬럼 상단에 고정 */
  const showInsertLineBeforeFirst =
    firstGroupId != null &&
    dropIndicatorId === `before:${firstGroupId}` &&
    activeTaskGroupId != null &&
    activeTaskGroupId !== firstGroupId;

  const itemIds = taskGroups.map((g) => g.id);

  return (
    <div className="flex flex-col gap-[12px]">
      <TaskColumnStatusHeader label={label} onAddTask={onAddCard} />

      <div
        ref={setNodeRef}
        className={cn(
          'flex flex-col gap-[12px] rounded-[12px] transition-colors duration-200',
          taskGroups.length === 0 && 'min-h-[120px]',
          isColumnDropTarget && 'bg-brand-secondary/60 p-[6px]',
        )}
      >
        {showInsertLineBeforeFirst ? (
          <div className="flex flex-col gap-1">
            <div
              className="pointer-events-none h-[3px] w-full shrink-0 rounded-full bg-brand-primary"
              aria-hidden
            />
            <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
              {taskGroups.map((group, index) => (
                <TaskSortableCardItem
                  key={group.id}
                  taskGroup={group}
                  onTaskToggle={onTaskToggle ? (taskId, checked) => onTaskToggle(group.id, taskId, checked) : undefined}
                  onEditCard={onEditCard}
                  onDeleteCard={onDeleteCard}
                  onOpenTaskList={onOpenTaskList}
                  activeTaskGroupId={activeTaskGroupId}
                  dropIndicatorId={dropIndicatorId}
                  suppressDropIndicatorBefore={index === 0}
                />
              ))}
            </SortableContext>
          </div>
        ) : (
          <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
            {taskGroups.map((group) => (
              <TaskSortableCardItem
                key={group.id}
                taskGroup={group}
                onTaskToggle={onTaskToggle ? (taskId, checked) => onTaskToggle(group.id, taskId, checked) : undefined}
                onEditCard={onEditCard}
                onDeleteCard={onDeleteCard}
                onOpenTaskList={onOpenTaskList}
                activeTaskGroupId={activeTaskGroupId}
                dropIndicatorId={dropIndicatorId}
              />
            ))}
          </SortableContext>
        )}
        {showEmptyColumnDropIndicator && (
          <div className="pointer-events-none px-0.5 pt-1" aria-hidden>
            <div className="h-[3px] w-full shrink-0 rounded-full bg-brand-primary" />
          </div>
        )}
        {showBottomDropIndicator && (
          <div className="pointer-events-none h-[3px] rounded-full bg-brand-primary" />
        )}
      </div>
    </div>
  );
}

