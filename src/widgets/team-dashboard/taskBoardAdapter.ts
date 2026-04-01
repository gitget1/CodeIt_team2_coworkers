import type { Task, TaskList } from '@/features/task/model/entities/task.model';
import type { TaskBoard, TaskBoardTaskGroup } from '@/features/task-board/model/taskBoard.types';

function toTaskGroup(taskList: TaskList, tasks: Task[]): TaskBoardTaskGroup {
  const taskListId = String(taskList.id);
  return {
    id: taskListId,
    name: taskList.title,
    tasks: tasks.map((task) => ({
      id: String(task.id),
      title: task.title,
      completed: task.isCompleted,
    })),
  };
}

/**
 * taskLists(컬럼)와 그룹 tasks(날짜 기준 할 일)를 합쳐 TaskBoard 뷰 모델로 변환.
 * 현재 API가 상태 컬럼 정보를 주지 않으므로 완료 여부 기준으로 TODO/DONE에 배치한다.
 */
export function toTaskBoard(taskLists: TaskList[], tasksByDate?: Task[]): TaskBoard {
  const todoGroups: TaskBoardTaskGroup[] = [];
  const inProgressGroups: TaskBoardTaskGroup[] = [];
  const doneGroups: TaskBoardTaskGroup[] = [];
  const hasDateScopedTasks = tasksByDate !== undefined;
  const hasAnyTaskListMapping = (tasksByDate ?? []).some((task) => task.taskListId != null);
  const tasksByTaskListId = new Map<number, Task[]>();

  for (const task of tasksByDate ?? []) {
    if (!task.taskListId) continue;
    const prev = tasksByTaskListId.get(task.taskListId) ?? [];
    prev.push(task);
    tasksByTaskListId.set(task.taskListId, prev);
  }

  for (const taskList of taskLists) {
    // 날짜 기준 tasks가 있고 taskListId 매핑이 가능한 경우에만 날짜 스냅샷을 사용한다.
    // (백엔드가 taskListId를 내려주지 않으면 카드 매핑이 불가하므로 taskList.tasks로 폴백)
    const resolvedTasks =
      hasDateScopedTasks && hasAnyTaskListMapping
        ? (tasksByTaskListId.get(taskList.id) ?? [])
        : taskList.tasks;
    const group = toTaskGroup(taskList, resolvedTasks);
    const taskCount = resolvedTasks.length;
    const completedCount = resolvedTasks.filter((task) => task.isCompleted).length;
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
