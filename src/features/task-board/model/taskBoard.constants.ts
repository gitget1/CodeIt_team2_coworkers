import type { TaskBoardColumnStatus } from './taskBoard.types';

export const TASK_BOARD_COLUMN_STATUS_LABEL: Record<TaskBoardColumnStatus, string> = {
  todo: '할 일',
  in_progress: '진행중',
  done: '완료',
};
