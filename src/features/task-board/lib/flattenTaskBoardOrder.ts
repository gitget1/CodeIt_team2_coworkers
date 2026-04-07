import type { TaskBoard, TaskBoardColumnStatus } from '../model/taskBoard.types';

const COLUMN_STATUS_ORDER: TaskBoardColumnStatus[] = ['TODO', 'IN_PROGRESS', 'DONE'];

/** 할 일 → 진행 중 → 완료 컬럼 순으로 할 일 목록 id를 한 줄로 펼칩니다. 서버 displayIndex와 동일한 순서 규칙. */
export function flattenTaskBoardTaskListIds(board: TaskBoard): string[] {
  const byStatus = new Map<TaskBoardColumnStatus, string[]>();
  for (const col of board.columns) {
    byStatus.set(
      col.status,
      col.taskGroups.map((g) => g.id),
    );
  }
  return COLUMN_STATUS_ORDER.flatMap((status) => byStatus.get(status) ?? []);
}
