import { useRef, useState } from 'react';
import {
  DndContext,
  DragOverlay,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
  PointerSensor,
  closestCorners,
  defaultDropAnimationSideEffects,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { cn } from '@/shared/lib/cn';
import type {
  TaskBoard,
  TaskBoardColumn,
  TaskBoardColumnStatus,
  TaskBoardTask,
  TaskBoardTaskGroup,
} from '../model/taskBoard.types';
import { MOCK_TASK_BOARD } from '../lib/mockData';
import { TaskColumn } from './TaskColumn';
import { TaskCard } from './TaskCard';

type Props = {
  initialBoard?: TaskBoard;
};

const COLUMN_DROPPABLE_ID_PREFIX = 'task-board-column:';

const INITIAL_CARD_INDEX: Record<TaskBoardColumnStatus, number> = {
  TODO: 1,
  IN_PROGRESS: 1,
  DONE: 1,
};

function getColumnDroppableId(status: TaskBoardColumnStatus) {
  return `${COLUMN_DROPPABLE_ID_PREFIX}${status}`;
}

function parseStatusFromDroppableId(droppableId: string): TaskBoardColumnStatus | null {
  if (!droppableId.startsWith(COLUMN_DROPPABLE_ID_PREFIX)) return null;
  const status = droppableId.replace(COLUMN_DROPPABLE_ID_PREFIX, '') as TaskBoardColumnStatus;
  if (status !== 'TODO' && status !== 'IN_PROGRESS' && status !== 'DONE') return null;
  return status;
}

function findTaskGroupLocation(columns: TaskBoardColumn[], taskGroupId: string) {
  for (const col of columns) {
    const index = col.taskGroups.findIndex((g) => g.id === taskGroupId);
    if (index !== -1) {
      return { status: col.status, index, taskGroup: col.taskGroups[index] };
    }
  }
  return null;
}

function createTask(id: string, title: string, completed: boolean): TaskBoardTask {
  return { id, title, completed };
}

function createTaskGroup(status: TaskBoardColumnStatus, index: number): TaskBoardTaskGroup {
  const groupId = `${status}-card-${index}`;
  const tasks: TaskBoardTask[] = [
    createTask(`${groupId}-task-1`, '새 체크리스트 항목 1', false),
    createTask(`${groupId}-task-2`, '새 체크리스트 항목 2', false),
    createTask(`${groupId}-task-3`, '새 체크리스트 항목 3', false),
  ];

  return { id: groupId, name: '새 카드', tasks };
}

export function TaskBoardView({ initialBoard = MOCK_TASK_BOARD }: Props) {
  const [board, setBoard] = useState<TaskBoard>(initialBoard);
  const [activeTaskGroupId, setActiveTaskGroupId] = useState<string | null>(null);
  const [dropIndicatorId, setDropIndicatorId] = useState<string | null>(null);
  const nextCardIndexByStatus = useRef<Record<TaskBoardColumnStatus, number>>({ ...INITIAL_CARD_INDEX });

  const handleAddCard = (status: TaskBoardColumnStatus) => {
    const index = nextCardIndexByStatus.current[status]++;
    const newGroup = createTaskGroup(status, index);

    setBoard((prev) => ({
      ...prev,
      columns: prev.columns.map((col) =>
        col.status === status ? { ...col, taskGroups: [newGroup, ...col.taskGroups] } : col,
      ),
    }));
  };

  const handleTaskToggle = (taskGroupId: string, taskId: string, checked: boolean) => {
    setBoard((prev) => {
      const columns = prev.columns.map((col) => ({ ...col, taskGroups: [...col.taskGroups] }));
      const loc = findTaskGroupLocation(columns, taskGroupId);
      if (!loc) return prev;

      const { status: fromStatus } = loc;
      const updatedTasks = loc.taskGroup.tasks.map((t) => (t.id === taskId ? { ...t, completed: checked } : t));
      const nextGroup: TaskBoardTaskGroup = { ...loc.taskGroup, tasks: updatedTasks };
      const allCompleted = nextGroup.tasks.length > 0 && nextGroup.tasks.every((t) => t.completed);
      const derivedStatus: TaskBoardColumnStatus = allCompleted ? 'DONE' : 'IN_PROGRESS';

      // remove from all columns first
      for (const col of columns) {
        col.taskGroups = col.taskGroups.filter((g) => g.id !== taskGroupId);
      }

      const destination = columns.find((c) => c.status === derivedStatus);
      if (!destination) return prev;

      // keep "more recent" on top when status changes
      const insertIndex = derivedStatus === fromStatus ? loc.index : 0;
      destination.taskGroups.splice(insertIndex, 0, nextGroup);

      return { ...prev, columns };
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTaskGroupId(null);
    setDropIndicatorId(null);
    if (!over) return;

    const activeId = String(active.id);
    const overId = String(over.id);
    if (activeId === overId) return;

    setBoard((prev) => {
      const columns = prev.columns.map((col) => ({ ...col, taskGroups: [...col.taskGroups] }));
      const loc = findTaskGroupLocation(columns, activeId);
      if (!loc) return prev;

      const activeGroup = loc.taskGroup;

      const overStatusFromId = parseStatusFromDroppableId(overId);
      const overIsColumn = overStatusFromId !== null;

      // over card => status is derived from its current column (not from drop target)
      let overCardStatus: TaskBoardColumnStatus | null = null;
      if (!overIsColumn) {
        const overLoc = findTaskGroupLocation(columns, overId);
        overCardStatus = overLoc?.status ?? null;
      }

      // drop target status: column droppable takes priority, otherwise card status
      const dropTargetStatus = overIsColumn ? (overStatusFromId as TaskBoardColumnStatus) : (overCardStatus as TaskBoardColumnStatus);
      if (!dropTargetStatus) return prev;

      // 드롭한 컬럼을 우선 존중하되, DONE으로 이동할 때만 하위 항목 자동 완료 처리
      const nextTasks =
        dropTargetStatus === 'DONE' ? activeGroup.tasks.map((t) => ({ ...t, completed: true })) : activeGroup.tasks;
      const destinationStatus: TaskBoardColumnStatus = dropTargetStatus;

      // remove active group from all columns
      for (const col of columns) {
        col.taskGroups = col.taskGroups.filter((g) => g.id !== activeId);
      }

      const destination = columns.find((c) => c.status === destinationStatus);
      if (!destination) return prev;

      // 컬럼에 직접 드롭하면 맨 아래에 추가
      let insertIndex = destination.taskGroups.length;
      if (!overIsColumn && overCardStatus === destinationStatus) {
        const overIndex = destination.taskGroups.findIndex((g) => g.id === overId);
        if (overIndex !== -1) {
          // 카드 위/아래 위치를 구분해 마지막 카드 아래 삽입도 가능하게 처리
          const translated = active.rect.current.translated;
          const overRect = over.rect;
          const activeCenterY = translated ? translated.top + translated.height / 2 : 0;
          const overMiddleY = overRect.top + overRect.height / 2;
          const isBelowHalf = activeCenterY > overMiddleY;
          insertIndex = overIndex + (isBelowHalf ? 1 : 0);
        }
      }

      destination.taskGroups.splice(insertIndex, 0, { ...activeGroup, tasks: nextTasks });

      return { ...prev, columns };
    });
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveTaskGroupId(String(event.active.id));
  };

  const handleDragOver = (event: DragOverEvent) => {
    if (!event.over) {
      setDropIndicatorId(null);
      return;
    }

    const overId = String(event.over.id);
    const overStatusFromId = parseStatusFromDroppableId(overId);
    if (overStatusFromId) {
      setDropIndicatorId(`column:${overId}`);
      return;
    }

    const translated = event.active.rect.current.translated;
    const overRect = event.over.rect;
    const activeCenterY = translated ? translated.top + translated.height / 2 : 0;
    const overMiddleY = overRect.top + overRect.height / 2;
    const isBelowHalf = activeCenterY > overMiddleY;

    setDropIndicatorId(`${isBelowHalf ? 'after' : 'before'}:${overId}`);
  };

  const handleDragCancel = () => {
    setActiveTaskGroupId(null);
    setDropIndicatorId(null);
  };

  const activeTaskGroup =
    activeTaskGroupId === null ? null : findTaskGroupLocation(board.columns, activeTaskGroupId)?.taskGroup ?? null;

  return (
    <DndContext
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
      sensors={useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
      )}
    >
      <div
        className={cn(
          'flex flex-col gap-[16px] items-start overflow-x-visible pb-2',
          'lg:flex-row lg:gap-[20px] lg:overflow-x-auto',
        )}
      >
        {board.columns.map((col: TaskBoardColumn) => (
          <div
            key={col.id}
            className="flex-shrink-0 w-[270px] max-[767px]:w-[343px] min-[768px]:w-[620px] lg:w-[270px]"
          >
            <TaskColumn
              status={col.status}
              taskGroups={col.taskGroups}
              onAddCard={() => handleAddCard(col.status)}
              onTaskToggle={handleTaskToggle}
              activeTaskGroupId={activeTaskGroupId}
              dropIndicatorId={dropIndicatorId}
            />
          </div>
        ))}
      </div>

      <DragOverlay
        dropAnimation={{
          duration: 260,
          easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
          sideEffects: defaultDropAnimationSideEffects({
            styles: {
              active: {
                opacity: '0.7',
              },
            },
          }),
        }}
      >
        {activeTaskGroup ? (
          <div className="scale-[1.02] drop-shadow-[0_14px_26px_rgba(15,23,42,0.18)]">
            <TaskCard taskGroup={activeTaskGroup} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
