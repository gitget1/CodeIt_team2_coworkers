import { useMemo, useRef, useState } from 'react';
import type { TaskBoard, TaskBoardColumnStatus, TaskBoardTask, TaskBoardTaskGroup } from '../model/taskBoard.types';
import { MOCK_TASK_BOARD } from '../lib/mockData';
import type { TaskBoardColumn } from '../model/taskBoard.types';
import { TaskColumn } from './TaskColumn';

type Props = {
  initialBoard?: TaskBoard;
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
  const nextCardIndexRef = useRef(1);

  const columns = useMemo(() => board.columns, [board.columns]);

  const handleAddCard = (status: TaskBoardColumnStatus) => {
    const index = nextCardIndexRef.current++;
    const newGroup = createTaskGroup(status, index);

    setBoard((prev) => ({
      ...prev,
      columns: prev.columns.map((col) =>
        col.status === status ? { ...col, taskGroups: [newGroup, ...col.taskGroups] } : col,
      ),
    }));
  };

  return (
    <div
      className="
        flex flex-col
        gap-[16px] items-start
        overflow-x-visible
        pb-2
        lg:flex-row lg:gap-[20px] lg:overflow-x-auto
      "
    >
      {columns.map((col: TaskBoardColumn) => (
        <div
          key={col.id}
          className="flex-shrink-0 w-[270px] max-[767px]:w-[343px] min-[768px]:w-[620px] lg:w-[270px]"
        >
          <TaskColumn status={col.status} taskGroups={col.taskGroups} onAddCard={() => handleAddCard(col.status)} />
        </div>
      ))}
    </div>
  );
}

