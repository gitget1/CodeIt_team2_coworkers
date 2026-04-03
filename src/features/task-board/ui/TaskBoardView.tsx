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
  TaskBoardTaskGroup,
} from '../model/taskBoard.types';
import { MOCK_TASK_BOARD } from '../lib/mockData';
import { applyTaskToggleToBoard } from '../lib/applyTaskToggleToBoard';
import { useTaskBoardDnd } from '../lib/useTaskBoardDnd';
import { useTaskBoardSensors } from '../lib/useTaskBoardSensors';
import type { ReactNode } from 'react';
import { TaskColumn } from './TaskColumn';
import { TaskCard } from './TaskCard';
import { CreateTaskBoardModal } from './CreateTaskBoardModal';
import { useTaskBoardCardActions } from './useTaskBoardCardActions';
import { TaskBoardCardActionModals } from './TaskBoardCardActionModals';
import { useTaskBoardBoard } from './useTaskBoardBoard';

type Props = {
  initialBoard?: TaskBoard;
  trailingPanel?: ReactNode;
  /** true 성공. false 실패. 콜백이 존재하고 true면 생성 로컬 setBoard는 생략(캐시/프롭 동기화 경로 사용). */
  onCreateTaskGroup?: (params: { status: TaskBoardColumnStatus; title: string }) => Promise<boolean> | boolean;
  onToggleTask?: (params: {
    taskGroupId: string;
    taskId: string;
    checked: boolean;
  }) => Promise<boolean | void> | boolean | void;
  onCompleteTaskGroupByDrop?: (params: {
    taskGroupId: string;
    taskIds: string[];
  }) => Promise<boolean | void> | boolean | void;
  /** true면 캐시/프롭이 곧 반영되므로 보드 로컬 갱신 생략. false 실패. undefined·void면 로컬 갱신. */
  onUpdateTaskGroup?: (params: { taskGroupId: string; title: string }) => Promise<boolean | void> | boolean | void;
  onDeleteTaskGroup?: (params: { taskGroupId: string }) => Promise<boolean | void> | boolean | void;
  onOpenTaskList?: (taskGroupId: string) => void;
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
  onToggleTask,
  onCompleteTaskGroupByDrop,
  onUpdateTaskGroup,
  onDeleteTaskGroup,
  onOpenTaskList,
}: Props) {
  const { board, setBoard, setCardNameLocal, removeCardLocal } = useTaskBoardBoard(initialBoard);
  const [creatingStatus, setCreatingStatus] = useState<TaskBoardColumnStatus | null>(null);
  const nextCardIndexByStatus = useRef<Record<TaskBoardColumnStatus, number>>({ ...INITIAL_CARD_INDEX });
  const sensors = useTaskBoardSensors();
  const { activeTaskGroupId, dropIndicatorId, activeTaskGroup, handleDragStart, handleDragOver, handleDragEnd, handleDragCancel } =
    useTaskBoardDnd({
      board,
      setBoard,
      onTaskGroupDropped: ({ taskGroupId, targetStatus, taskIdsToComplete }) => {
        if (targetStatus !== 'DONE' || taskIdsToComplete.length === 0) return;
        void onCompleteTaskGroupByDrop?.({ taskGroupId, taskIds: taskIdsToComplete });
      },
    });

  const openCreateTaskBoardModal = (status: TaskBoardColumnStatus) => {
    setCreatingStatus(status);
  };

  const handleAddCard = async (title: string) => {
    if (!creatingStatus) return;
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;

    const status = creatingStatus;
    const created = await onCreateTaskGroup?.({ status, title: trimmedTitle });
    if (created === false) return;

    // 콜백이 있는 경로(팀 대시보드)는 캐시 동기화로 반영되므로 로컬 중복 생성 방지.
    if (onCreateTaskGroup && created === true) {
      setCreatingStatus(null);
      return;
    }

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

  const handleTaskToggle = async (taskGroupId: string, taskId: string, checked: boolean) => {
    const prevBoard = board;
    setBoard((prev) => applyTaskToggleToBoard(prev, taskGroupId, taskId, checked));

    const toggled = await onToggleTask?.({ taskGroupId, taskId, checked });
    if (toggled === false) {
      setBoard(prevBoard);
    }
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
              onOpenTaskList={onOpenTaskList}
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
