import { useMemo, useState } from 'react';
import type { useSortable } from '@dnd-kit/sortable';
import type { TaskBoardTaskGroup } from '../model/taskBoard.types';
import { TaskRow } from './TaskRow';
import { TaskCardHeader } from './TaskCardHeader';
import { TaskCardShell } from './TaskCardShell';

export type SortableDragAttributes = ReturnType<typeof useSortable>['attributes'];
export type SortableDragListeners = ReturnType<typeof useSortable>['listeners'];

export type TaskCardProps = {
  taskGroup: TaskBoardTaskGroup;
  /** dnd-kit: 카드 드래그 핸들 ref */
  setActivatorNodeRef?: (node: HTMLElement | null) => void;
  /** dnd-kit: 드래그 어트리뷰트(aria/role 등) */
  dragAttributes?: SortableDragAttributes;
  /** dnd-kit: 드래그 리스너(포인터 이벤트 등) */
  dragListeners?: SortableDragListeners;
  onTaskToggle?: (taskId: string, checked: boolean) => void;
  onEditCard?: (taskGroup: TaskBoardTaskGroup) => void;
  onDeleteCard?: (taskGroup: TaskBoardTaskGroup) => void;
};

export function TaskCard({
  taskGroup,
  setActivatorNodeRef,
  dragAttributes,
  dragListeners,
  onTaskToggle,
  onEditCard,
  onDeleteCard,
}: TaskCardProps) {
  const [collapsed, setCollapsed] = useState(false);
  const tasks = taskGroup.tasks;

  const { checkedTaskCount, cardTaskCount } = useMemo(() => {
    const total = tasks.length;
    const checked = tasks.reduce((acc, t) => acc + (t.completed ? 1 : 0), 0);
    return { checkedTaskCount: checked, cardTaskCount: total };
  }, [tasks]);

  const isFullyCompleted = cardTaskCount > 0 && checkedTaskCount === cardTaskCount;

  const toggleCollapsed = () => {
    setCollapsed((prev) => !prev);
  };

  const handleTaskToggle = (taskId: string, checked: boolean) => {
    onTaskToggle?.(taskId, checked);
  };

  return (
    <TaskCardShell collapsed={collapsed}>
      <TaskCardHeader
        cardName={taskGroup.name}
        collapsed={collapsed}
        isFullyCompleted={isFullyCompleted}
        checkedTaskCount={checkedTaskCount}
        cardTaskCount={cardTaskCount}
        onToggleCollapsed={toggleCollapsed}
        activatorRef={setActivatorNodeRef}
        dragAttributes={dragAttributes}
        dragListeners={dragListeners}
        onEditCard={() => onEditCard?.(taskGroup)}
        onDeleteCard={() => onDeleteCard?.(taskGroup)}
      />

      {!collapsed && (
        <div className="flex-1 overflow-visible">
          <div className="flex flex-col gap-[10px]">
            {tasks.map((task) => (
              <TaskRow key={task.id} task={task} onToggle={(checked) => handleTaskToggle(task.id, checked)} />
            ))}
          </div>
        </div>
      )}
    </TaskCardShell>
  );
}
