/* 보드 */
export type TaskBoard = {
  columns: TaskBoardColumn[];
};
/* 컬럼 */
export type TaskBoardColumn = {
  id: string;
  title: TaskBoardColumnTitle;
  cards: TaskBoardCard[];
};

export type TaskBoardColumnTitle = '할 일' | '진행중' | '완료';

/* 카드 */
export type TaskBoardCard = {
  id: string;
  title: string;
  tasks: TaskBoardTaskItem[];
  collapsed: boolean;
};

/* 할일  */
export type TaskBoardTaskItem = {
  id: string;
  label: string;
  checked: boolean;
};









