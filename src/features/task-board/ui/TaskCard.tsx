import { useEffect, useMemo, useState } from 'react';
import type { TaskBoardTask, TaskBoardTaskGroup } from '../model/taskBoard.types';
import { TaskRow } from './TaskRow';
import { TaskCardHeader } from './TaskCardHeader';
import { TaskCardShell } from './TaskCardShell';

export type TaskCardProps = {
  taskGroup: TaskBoardTaskGroup;
  onTaskToggle?: (taskId: string, checked: boolean) => void;
};

export function TaskCard({ taskGroup, onTaskToggle }: TaskCardProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [tasks, setTasks] = useState<TaskBoardTask[]>(taskGroup.tasks);

  useEffect(() => {
    setTasks(taskGroup.tasks);
  }, [taskGroup.id, taskGroup.tasks]);

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
    setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, completed: checked } : t)));
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
