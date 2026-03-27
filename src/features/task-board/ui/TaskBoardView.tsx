import { useRef, useState } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  defaultDropAnimationSideEffects,
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
import { findTaskGroupLocation } from '../lib/taskBoardDnd.utils';
import { useTaskBoardDnd } from '../lib/useTaskBoardDnd';
import { useTaskBoardSensors } from '../lib/useTaskBoardSensors';
import { TaskColumn } from './TaskColumn';
import { TaskCard } from './TaskCard';

type Props = {
  initialBoard?: TaskBoard;
};

const INITIAL_CARD_INDEX: Record<TaskBoardColumnStatus, number> = {
  TODO: 1,
  IN_PROGRESS: 1,
  DONE: 1,
};

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
  const nextCardIndexByStatus = useRef<Record<TaskBoardColumnStatus, number>>({ ...INITIAL_CARD_INDEX });
  const sensors = useTaskBoardSensors();
  const { activeTaskGroupId, dropIndicatorId, activeTaskGroup, handleDragStart, handleDragOver, handleDragEnd, handleDragCancel } =
    useTaskBoardDnd({ board, setBoard });

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

  return (
    <DndContext
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
      sensors={sensors}
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
