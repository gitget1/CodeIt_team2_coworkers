import { useEffect, useRef, useState } from 'react';
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
  TaskBoardTaskGroup,
} from '../model/taskBoard.types';
import { MOCK_TASK_BOARD } from '../lib/mockData';
import { findTaskGroupLocation } from '../lib/taskBoardDnd.utils';
import { useTaskBoardDnd } from '../lib/useTaskBoardDnd';
import { useTaskBoardSensors } from '../lib/useTaskBoardSensors';
import type { ReactNode } from 'react';
import { TaskColumn } from './TaskColumn';
import { TaskCard } from './TaskCard';
import { CreateTaskBoardModal } from './CreateTaskBoardModal';
import { useTaskBoardCardActions } from './useTaskBoardCardActions';
import { TaskBoardCardActionModals } from './TaskBoardCardActionModals';

type Props = {
  initialBoard?: TaskBoard;
  trailingPanel?: ReactNode;
  onCreateTaskGroup?: (params: { status: TaskBoardColumnStatus; title: string }) => Promise<boolean> | boolean;
  onUpdateTaskGroup?: (params: { taskGroupId: string; title: string }) => Promise<boolean> | boolean;
  onDeleteTaskGroup?: (params: { taskGroupId: string }) => Promise<boolean> | boolean;
};

const INITIAL_CARD_INDEX: Record<TaskBoardColumnStatus, number> = {
  TODO: 1,
  IN_PROGRESS: 1,
  DONE: 1,
};

function createTaskGroup(status: TaskBoardColumnStatus, index: number, name: string): TaskBoardTaskGroup {
  const groupId = `${status}-card-${index}`;
  return { id: groupId, name, tasks: [] };
}

export function TaskBoardView({
  initialBoard = MOCK_TASK_BOARD,
  trailingPanel,
  onCreateTaskGroup,
  onUpdateTaskGroup,
  onDeleteTaskGroup,
}: Props) {
  const [board, setBoard] = useState<TaskBoard>(initialBoard);
  const [creatingStatus, setCreatingStatus] = useState<TaskBoardColumnStatus | null>(null);
  const nextCardIndexByStatus = useRef<Record<TaskBoardColumnStatus, number>>({ ...INITIAL_CARD_INDEX });
  const sensors = useTaskBoardSensors();
  const { activeTaskGroupId, dropIndicatorId, activeTaskGroup, handleDragStart, handleDragOver, handleDragEnd, handleDragCancel } =
    useTaskBoardDnd({ board, setBoard });

  const openCreateTaskBoardModal = (status: TaskBoardColumnStatus) => {
    setCreatingStatus(status);
  };

  const handleAddCard = async (title: string) => {
    if (!creatingStatus) return;
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;

    const status = creatingStatus;
    const shouldCreateLocalCard = await onCreateTaskGroup?.({ status, title: trimmedTitle });
    if (shouldCreateLocalCard === false) return;

    const index = nextCardIndexByStatus.current[status]++;
    const newGroup = createTaskGroup(status, index, trimmedTitle);

    setBoard((prev) => ({
      ...prev,
      columns: prev.columns.map((col) =>
        col.status === status ? { ...col, taskGroups: [newGroup, ...col.taskGroups] } : col,
      ),
    }));
    setCreatingStatus(null);
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

  const setCardNameLocal = (taskGroupId: string, title: string) => {
    setBoard((prev) => ({
      ...prev,
      columns: prev.columns.map((col) => ({
        ...col,
        taskGroups: col.taskGroups.map((group) =>
          group.id === taskGroupId ? { ...group, name: title } : group,
        ),
      })),
    }));
  };

  const removeCardLocal = (taskGroupId: string) => {
    setBoard((prev) => ({
      ...prev,
      columns: prev.columns.map((col) => ({
        ...col,
        taskGroups: col.taskGroups.filter((group) => group.id !== taskGroupId),
      })),
    }));
  };

  const {
    editingCard,
    editedTitle,
    setEditedTitle,
    setEditingCard,
    deletingCardId,
    setDeletingCardId,
    openEditCardModal,
    handleConfirmEditCard,
    openDeleteCardModal,
    handleConfirmDeleteCard,
  } = useTaskBoardCardActions({
    onUpdateTaskGroup,
    onDeleteTaskGroup,
    setCardNameLocal,
    removeCardLocal,
  });

  useEffect(() => {
    setBoard(initialBoard);
  }, [initialBoard]);

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
          'lg:flex-row lg:items-start lg:gap-[20px] lg:overflow-x-auto',
        )}
      >
        {board.columns.map((col: TaskBoardColumn) => (
          <div
            key={col.id}
            className="min-w-0 w-full shrink-0 lg:w-[270px]"
          >
            <TaskColumn
              status={col.status}
              taskGroups={col.taskGroups}
              onAddCard={() => openCreateTaskBoardModal(col.status)}
              onTaskToggle={handleTaskToggle}
              onEditCard={openEditCardModal}
              onDeleteCard={openDeleteCardModal}
              activeTaskGroupId={activeTaskGroupId}
              dropIndicatorId={dropIndicatorId}
            />
          </div>
        ))}
        {trailingPanel != null ? (
          <div className="hidden min-w-0 shrink-0 self-start lg:flex lg:w-[240px] lg:flex-col">{trailingPanel}</div>
        ) : null}
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

      <CreateTaskBoardModal
        isOpen={creatingStatus !== null}
        close={() => setCreatingStatus(null)}
        onSubmit={handleAddCard}
      />

      <TaskBoardCardActionModals
        editingCard={editingCard}
        editedTitle={editedTitle}
        setEditedTitle={setEditedTitle}
        setEditingCard={setEditingCard}
        onConfirmEdit={handleConfirmEditCard}
        deletingCardId={deletingCardId}
        setDeletingCardId={setDeletingCardId}
        onConfirmDelete={handleConfirmDeleteCard}
      />
    </DndContext>
  );
}
