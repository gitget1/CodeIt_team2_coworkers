import type { TaskList } from '@/features/task/model/entities/task.model';
import type { TaskBoard, TaskBoardTaskGroup } from '@/features/task-board/model/taskBoard.types';

function toTaskGroup(taskList: TaskList): TaskBoardTaskGroup {
  const taskListId = String(taskList.id);
  return {
    id: taskListId,
    name: taskList.title,
    tasks: taskList.tasks.map((task) => ({
      id: String(task.id),
      title: task.title,
      completed: task.isCompleted,
    })),
  };
}

/**
 * 그룹 Task API 응답(Task[])을 TaskBoard 뷰 모델로 변환.
 * 현재 API가 상태 컬럼 정보를 주지 않으므로 완료 여부 기준으로 TODO/DONE에 배치한다.
 */
export function toTaskBoard(taskLists: TaskList[]): TaskBoard {
  const todoGroups: TaskBoardTaskGroup[] = [];
  const inProgressGroups: TaskBoardTaskGroup[] = [];
  const doneGroups: TaskBoardTaskGroup[] = [];

  for (const taskList of taskLists) {
    const group = toTaskGroup(taskList);
    const taskCount = taskList.tasks.length;
    const completedCount = taskList.tasks.filter((task) => task.isCompleted).length;
    if (taskCount > 0 && completedCount === taskCount) {
      doneGroups.push(group);
    } else if (completedCount > 0) {
      inProgressGroups.push(group);
    } else {
      todoGroups.push(group);
    }
  }

  return {
    columns: [
      {
        id: 'todo',
        status: 'TODO',
        taskGroups: todoGroups,
      },
      {
        id: 'in-progress',
        status: 'IN_PROGRESS',
        taskGroups: inProgressGroups,
      },
      {
        id: 'done',
        status: 'DONE',
        taskGroups: doneGroups,
      },
    ],
  };
}
