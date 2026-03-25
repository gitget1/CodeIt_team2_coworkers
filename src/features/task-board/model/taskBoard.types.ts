
export type TaskBoardColumnStatus = 'todo' | 'in_progress' | 'done';

export type TaskBoard = {
  columns: TaskBoardColumn[];
};


export type TaskBoardColumn = {
  id: string;
  status: TaskBoardColumnStatus;
  taskGroups: TaskBoardTaskGroup[];
};


export type TaskBoardTaskGroup = {
  id: string;
  name: string;
  tasks: TaskBoardTask[];
};

export type TaskBoardTask = {
  id: string;
  title: string;
  completed: boolean;
};
