import type { TaskBoardColumn, TaskBoardColumnStatus } from '../model/taskBoard.types';

const COLUMN_DROPPABLE_ID_PREFIX = 'task-board-column:';

export function parseStatusFromDroppableId(droppableId: string): TaskBoardColumnStatus | null {
  if (!droppableId.startsWith(COLUMN_DROPPABLE_ID_PREFIX)) return null;
  const status = droppableId.replace(COLUMN_DROPPABLE_ID_PREFIX, '') as TaskBoardColumnStatus;
  if (status !== 'TODO' && status !== 'IN_PROGRESS' && status !== 'DONE') return null;
  return status;
}

export function findTaskGroupLocation(columns: TaskBoardColumn[], taskGroupId: string) {
  for (const col of columns) {
    const index = col.taskGroups.findIndex((g) => g.id === taskGroupId);
    if (index !== -1) {
      return { status: col.status, index, taskGroup: col.taskGroups[index] };
    }
  }
  return null;
}

/** 포인터 Y가 over 카드 중심보다 아래이면 true (after 삽입) */
export function isPointerInAfterHalfOfOverRect(
  y: number,
  overRect: { top: number; height: number },
): boolean {
  const h = Math.max(overRect.height, 1);
  const t = (y - overRect.top) / h;
  return t > 0.5;
}
