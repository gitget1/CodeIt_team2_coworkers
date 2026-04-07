import type { Task, TaskList } from '@/features/task/model/entities/task.model';
import type {
  TaskBoard,
  TaskBoardColumnStatus,
  TaskBoardTaskGroup,
} from '@/features/task-board/model/taskBoard.types';

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

function columnFromCompletion(resolvedTasks: Task[]): TaskBoardColumnStatus {
  const taskCount = resolvedTasks.length;
  const completedCount = resolvedTasks.filter((task) => task.isCompleted).length;
  if (taskCount > 0 && completedCount === taskCount) return 'DONE';
  if (completedCount > 0) return 'IN_PROGRESS';
  return 'TODO';
}

/**
 * taskLists와 날짜별 tasks를 합쳐 TaskBoard로 변환.
 * 기본 컬럼은 완료율 기준. `columnOverrides`는 드래그한 칸을 새로고침 전까지 유지(localStorage).
 */
export function toTaskBoard(
  taskLists: TaskList[],
  tasksByDate?: Task[],
  columnOverrides?: ReadonlyMap<string, TaskBoardColumnStatus>,
): TaskBoard {
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

  const orderedLists = [...taskLists].sort((a, b) => a.order - b.order || a.id - b.id);

  for (const taskList of orderedLists) {
    // 날짜 기준 tasks가 있고 taskListId 매핑이 가능한 경우에만 날짜 스냅샷을 사용한다.
    // (백엔드가 taskListId를 내려주지 않으면 카드 매핑이 불가하므로 taskList.tasks로 폴백)
    const resolvedTasks =
      hasDateScopedTasks && hasAnyTaskListMapping
        ? (tasksByTaskListId.get(taskList.id) ?? [])
        : taskList.tasks;
    const group = toTaskGroup(taskList, resolvedTasks);
    const computed = columnFromCompletion(resolvedTasks);
    const o = columnOverrides?.get(String(taskList.id));

    let effective: TaskBoardColumnStatus;
    if (computed === 'DONE') {
      if (o === 'TODO' || o === 'IN_PROGRESS') {
        effective = o;
      } else {
        effective = 'DONE';
      }
    } else if (computed === 'TODO') {
      /** 빈 목록은 computed가 항상 TODO라서, +로 진행 중/완료 칸에서 만든 경우 columnOverrides로 칸을 맞춘다. */
      if (o === 'IN_PROGRESS' || o === 'DONE') {
        effective = o;
      } else {
        effective = 'TODO';
      }
    } else if (computed === 'IN_PROGRESS') {
      /**
       * 전부 완료 + 할 일 오버라이드였다가 하나만 해제하면 computed는 진행 중인데
       * 저장된 TODO 오버라이드가 남아 할 일로 튀는 문제 방지.
       */
      if (o === 'TODO') {
        effective = 'IN_PROGRESS';
      } else if (o === 'IN_PROGRESS' || o === 'DONE') {
        effective = o;
      } else {
        effective = 'IN_PROGRESS';
      }
    } else {
      effective = computed;
    }

    if (effective === 'DONE') {
      doneGroups.push(group);
    } else if (effective === 'IN_PROGRESS') {
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
